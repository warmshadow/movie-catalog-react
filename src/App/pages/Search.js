import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMoviesSearch as setMoviesSearchAction } from '../actions';
import MovieList from '../components/MovieList';

function Search({ movies, setMoviesSearch, baseUrl }) {
  const { title, pageNum } = useParams();

  useEffect(() => {
    setMoviesSearch(title, pageNum);
  }, [title, pageNum, setMoviesSearch]);

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2>Search results for:</h2>
      <h3>{title}</h3>
      <MovieList movies={movies} baseUrl={baseUrl} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  setMoviesSearch: setMoviesSearchAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
