/* eslint-disable camelcase */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddToListModal from './AddToListModal';
import useAddToList from '../hooks/useAddToList';
import useAddToWatchlist from '../hooks/useAddToWatchlist';

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

const Directors = ({ directors }) => {
  if (!directors.length) {
    return null;
  }
  return directors.map((director) => (
    <Card.Text key={director.name}>{`Dir. ${director.name}`}</Card.Text>
  ));
};

const Info = ({ voteAverage, runtime, language }) => (
  <Card.Text key={voteAverage}>
    <span>{`${voteAverage} / `}</span>
    <span>{runtime && `${runtime}min / `}</span>
    <span>{`${language}`}</span>
  </Card.Text>
);

const Genres = ({ genres }) => {
  if (!genres.length) {
    return null;
  }
  return genres.map((genre) => (
    <Card.Text className="d-inline" key={genre.id}>
      {`${genre.name}  `}
    </Card.Text>
  ));
};

const Overview = ({ overview }) => (
  <Card.Subtitle className="text-muted font-italic my-3" key="overview">
    {overview || 'No overview..'}
  </Card.Subtitle>
);

const ExternalLinks = ({ imdbId, imdbBaseUrl, homepage }) => (
  <>
    {imdbId && (
      <Button key={imdbId} variant="warning" href={`${imdbBaseUrl}${imdbId}`} target="_blank">
        IMDB
      </Button>
    )}
    {homepage && (
      <Button key={homepage} variant="info" href={homepage} target="_blank">
        Homepage
      </Button>
    )}
  </>
);

const OptionButtons = ({ addToList, addToWatchlist, item }) => (
  <>
    <Button className="mr-3" variant="outline-dark" onClick={() => addToList(item)}>
      Add to List
    </Button>
    <Button variant="outline-dark" onClick={() => addToWatchlist(item)}>
      Add to Watchlist
    </Button>
  </>
);

function MovieDetails({ movie, directors, baseUrl, imdbBaseUrl }) {
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

  const { addToList, handleClose, selectedMovie, showModal } = useAddToList();
  const addToWatchlist = useAddToWatchlist();

  return (
    <>
      <Row noGutters>
        <Col md={6} lg={4} className="d-flex">
          <Card.Img src={`${baseUrl}w780${posterPath}`} alt="Poster" />
        </Col>
        <Col md={6} lg={8} className="d-flex">
          <Card className="bg-transparent border-0 w-100">
            <Card.Header>
              <h1 className="moviedetails-header">{title}</h1>
              <Card.Text className="font-italic">{tagline}</Card.Text>
            </Card.Header>
            <Card.Body>
              <Directors directors={directors} />
              <Info voteAverage={voteAverage} runtime={runtime} language={originalLanguage} />
              <Genres genres={genres} />
              <Overview overview={overview} />
              <ExternalLinks imdbId={imdbId} imdbBaseUrl={imdbBaseUrl} homepage={homepage} />
            </Card.Body>
            <Card.Footer>
              <OptionButtons addToList={addToList} addToWatchlist={addToWatchlist} item={item} />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <AddToListModal show={showModal} item={selectedMovie} handleClose={handleClose} />
    </>
  );
}

export default MovieDetails;
