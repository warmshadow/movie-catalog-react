import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMovieListSearch } from '../actions';
import MovieList from '../components/MovieList';

function Search({ movieList, setMovieList }) {
  const { title } = useParams();

  useEffect(() => {
    setMovieList(title);
  }, [setMovieList, title]);

  if (movieList.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2>Search results for:</h2>
      <h3>{title}</h3>
      <MovieList movies={movieList.results} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieList: state.movieList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovieList: (title) => dispatch(setMovieListSearch(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
