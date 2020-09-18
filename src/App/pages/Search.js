import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {
  setMoviesSearch as setMoviesSearchAction,
  clearMovies as clearMoviesAction,
} from '../actions';
import MovieList from '../components/MovieList';
import pageIsInt from '../helpers';

function Search({ movies, setMoviesSearch, clearMovies, baseUrl }) {
  const { title, pageNum } = useParams();
  const basePath = `/search/${title}`;

  useEffect(() => {
    setMoviesSearch(title, pageNum);

    return () => clearMovies();
  }, [title, pageNum, setMoviesSearch, clearMovies]);

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2 className="mt-3">{title}</h2>
      <h6 className="mb-5">results</h6>
      <MovieList movies={movies} baseUrl={baseUrl} basePath={basePath} />
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
  clearMovies: clearMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
