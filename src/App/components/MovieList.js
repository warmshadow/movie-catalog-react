import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from './MovieCard';
import PageLinks from './PageLinks';

function MovieList({ movies, baseUrl, basePath, addToList }) {
  if (movies.isPending) return <Spinner animation="border" />;

  return movies.results.length ? (
    <>
      {movies.results.map((movie) => {
        const {
          id,
          poster_path: posterPath,
          title,
          release_date: releaseDate,
          vote_average: voteAverage,
        } = movie;
        return (
          <MovieCard
            id={id}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            baseUrl={baseUrl}
            key={id}
            add={() => addToList(movie)}
          />
        );
      })}
      <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

export default MovieList;
