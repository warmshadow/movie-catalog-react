import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, baseUrl }) {
  return movies.results.length ? (
    <>
      {movies.results.map((movie) => (
        <MovieCard movie={movie} baseUrl={baseUrl} key={movie.id} />
      ))}
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

export default MovieList;
