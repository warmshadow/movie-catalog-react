/* eslint-disable camelcase */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const keysToCamel = ({
  poster_path,
  release_date,
  vote_average,
  original_language,
  imdb_id,
  ...object
}) => ({
  posterPath: poster_path,
  releaseDate: release_date,
  voteAverage: vote_average,
  originalLanguage: original_language,
  imdbId: imdb_id,
  ...object,
});

function MovieDetails({ movie, directors, baseUrl, imdbBaseUrl, addToList, addToWatchlist }) {
  const item = keysToCamel(movie);
  const {
    posterPath,
    title,
    tagline,
    runtime,
    voteAverage,
    originalLanguage,
    overview,
    genres,
    imdbId,
    homepage,
  } = item;

  return (
    <Row noGutters>
      <Col md={6} lg={4} className="d-flex">
        <Card.Img src={`${baseUrl}w780${posterPath}`} alt="Poster" />
      </Col>
      <Col md={6} lg={8} className="d-flex">
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
            <Button className="mr-3" variant="outline-dark" onClick={() => addToList(item)}>
              Add to List
            </Button>
            <Button variant="outline-dark" onClick={() => addToWatchlist(item)}>
              Add to Watchlist
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default MovieDetails;
