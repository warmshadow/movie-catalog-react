import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies }) {
  const baseUrl = 'https://image.tmdb.org/t/p/';

  return (
    <>
      {movies.map((movie) => (
        <MovieCard movie={movie} baseUrl={baseUrl} key={movie.id} />
      ))}
    </>
  );
}

export default MovieList;
