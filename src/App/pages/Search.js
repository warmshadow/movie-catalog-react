import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import MovieList from '../components/MovieList';

function Search() {
  const { title } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const res = await tmdb.get('/search/movie', {
        params: {
          query: title,
        },
      });
      setResults(res.data);
    }
    fetchMovies();
  }, [title]);

  if (!results) return <div>Loading</div>;

  return (
    <>
      <h2>Search results for:</h2>
      <h3>{title}</h3>
      <MovieList movies={results.results} />
    </>
  );
}

export default Search;
