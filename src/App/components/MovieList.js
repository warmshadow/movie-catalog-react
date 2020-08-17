import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import MovieCard from './MovieCard';
import PageLinks from './PageLinks';
import ListsModal from './ListsModal';

function MovieList({ movies, baseUrl, basePath }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  if (movies.isPending) return <Spinner animation="border" />;

  return movies.results.length ? (
    <>
      {movies.results.map((movie) => {
        const { id, poster_path: posterPath, title, release_date: releaseDate } = movie;
        return (
          <div style={{ width: '100%', position: 'relative' }}>
            <MovieCard
              id={id}
              posterPath={posterPath}
              title={title}
              releaseDate={releaseDate}
              baseUrl={baseUrl}
              key={id}
            />
            <Button
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translate(-10%, -50%)',
              }}
              variant="outline-dark"
              onClick={() => handleClick(movie)}
            >
              Add to List
            </Button>
          </div>
        );
      })}
      <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
      <ListsModal show={showModal} movie={selectedMovie} handleClose={handleClose} />
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

export default MovieList;
