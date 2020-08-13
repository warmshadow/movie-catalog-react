import React from 'react';
import { useParams } from 'react-router-dom';

function Search() {
  const { title } = useParams();
  return (
    <>
      <h2>Search results for:</h2>
      <h3>{title}</h3>
    </>
  );
}

export default Search;
