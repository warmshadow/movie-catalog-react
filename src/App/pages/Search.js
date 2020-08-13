import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie?query=';
const TOKEN = process.env.REACT_APP_BEARER_TOKEN;
const AUTH = `Bearer ${TOKEN}`;

const HEADERS = {
  Authorization: AUTH,
};

function Search() {
  const { title } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get(`${BASE_URL}${title}`, {
        headers: HEADERS,
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
