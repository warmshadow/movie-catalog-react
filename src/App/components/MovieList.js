import React from 'react';
import MovieCard from './MovieCard';
import PageLinks from './PageLinks';

function MovieList({ movies, baseUrl, basePath }) {
  return movies.results.length ? (
    <>
      {movies.results.map((movie) => (
        <MovieCard movie={movie} baseUrl={baseUrl} key={movie.id} />
      ))}
      <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

export default MovieList;
