import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from './MovieCard';
import PageLinks from './PageLinks';
import ListsModal from './ListsModal';

function MovieList({ movies, baseUrl, basePath, auth }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleAdd = (movie) => {
    if (auth.uid) {
      setSelectedMovie(movie);
      setShowModal(true);
    } else history.push('/signin');
  };

  const handleClose = () => setShowModal(false);

  if (movies.isPending) return <Spinner animation="border" />;

  return movies.results.length ? (
    <>
      {movies.results.map((movie) => {
        const { id, poster_path: posterPath, title, release_date: releaseDate } = movie;
        return (
          <MovieCard
            id={id}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            baseUrl={baseUrl}
            key={id}
            add={() => handleAdd(movie)}
          />
        );
      })}
      <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
      <ListsModal show={showModal} movie={selectedMovie} handleClose={handleClose} />
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(MovieList);
