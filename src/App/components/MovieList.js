import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, baseUrl }) {
  return (
    <>
      {movies.map((movie) => (
        <MovieCard movie={movie} baseUrl={baseUrl} key={movie.id} />
      ))}
    </>
  );
}

export default MovieList;
