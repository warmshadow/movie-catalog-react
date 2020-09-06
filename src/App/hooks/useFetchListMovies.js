import { useState, useEffect } from 'react';
import tmdb from '../api/tmdb';

const fetchMovie = async (movie) => {
  const res = await tmdb.get(`/movie/${movie.id}`);
  return res.data;
};

function useFetchListMovies() {
  const [movieIds, setMovieIds] = useState(null);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      if (movieIds) {
        const allMovies = {};
        const fetchMovies = movieIds.map(fetchMovie);
        allMovies.items = await Promise.all(fetchMovies);

        setMovies(allMovies);
      }
    };
    fetchAllMovies();
  }, [movieIds]);

  const fetchOnListChange = (items) => {
    if (!movieIds || movieIds.length !== items.length) setMovieIds(items);
  };

  return { fetchOnListChange, movies };
}

export default useFetchListMovies;
