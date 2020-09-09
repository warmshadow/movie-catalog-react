import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {
  setMoviesCategory as setMoviesCategoryAction,
  clearMovies as clearMoviesAction,
} from '../actions';
import MovieList from '../components/MovieList';
import pageIsInt from '../helpers';

function Category({ categories, movies, baseUrl, setMoviesCategory, clearMovies }) {
  const { title, pageNum } = useParams();
  const basePath = `/category/${title}`;
  const category = categories[title];

  useEffect(() => {
    if (category) {
      const { pathName } = category;
      setMoviesCategory(pathName, pageNum);
    }

    return () => clearMovies();
  }, [title, pageNum, setMoviesCategory, clearMovies, categories, category]);

  if (!category) return <Redirect to="/notfound" />;

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2 className="font-italic mt-3 mb-5">{`${category.name} MOVIES`}</h2>
      <MovieList movies={movies} baseUrl={baseUrl} basePath={basePath} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.config.categories,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  setMoviesCategory: setMoviesCategoryAction,
  clearMovies: clearMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
