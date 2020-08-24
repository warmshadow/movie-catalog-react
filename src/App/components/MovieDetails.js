import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListsModal from './ListsModal';

function MovieDetails({ movie, directors, baseUrl, imdbBaseUrl, auth }) {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    if (auth.uid) {
      setShowModal(true);
    } else history.push('/signin');
  };

  const handleClose = () => setShowModal(false);

  const {
    poster_path: posterPath,
    title,
    tagline,
    runtime,
    vote_average: voteAverage,
    original_language: originalLanguage,
    overview,
    genres,
    imdb_id: imdbId,
    homepage,
  } = movie;

  return (
    <>
      <Row noGutters style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Col md={6} lg={4} style={{ display: 'flex' }}>
          <Card.Img
            src={`${baseUrl}w780${posterPath}`}
            alt="poster"
            style={{ maxHeight: '100%' }}
          />
        </Col>
        <Col md={6} lg={8} style={{ display: 'flex' }}>
          <Card className="bg-transparent border-0">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text className="font-italic" key={tagline}>
                {tagline}
              </Card.Text>
              {directors.map((director) => (
                <Card.Text key={director.name}>{`Dir. ${director.name}`}</Card.Text>
              ))}
              <Card.Text key={voteAverage}>
                {`${voteAverage} / ${runtime}min / ${originalLanguage}`}
              </Card.Text>
              {genres.map((genre) => (
                <Card.Text className="d-inline" key={genre.id}>
                  {`${genre.name}  `}
                </Card.Text>
              ))}
              <Card.Subtitle className="text-muted font-italic my-3" key={overview.substring(0, 9)}>
                {overview}
              </Card.Subtitle>
              {imdbId && (
                <Button
                  key={imdbId}
                  variant="warning"
                  href={`${imdbBaseUrl}${imdbId}`}
                  target="_blank"
                >
                  IMDB
                </Button>
              )}
              {homepage && (
                <Button key={homepage} variant="info" href={homepage} target="_blank">
                  Homepage
                </Button>
              )}
            </Card.Body>
            <Card.Footer>
              <Button variant="outline-dark" onClick={() => handleClick(movie)}>
                Add to List
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <ListsModal show={showModal} movie={movie} handleClose={handleClose} />
    </>
  );
}

export default MovieDetails;
