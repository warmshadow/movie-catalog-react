import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {
  setMovie as setMovieAction,
  clearMovie as clearMovieAction,
  setMoviesSimilar as setMoviesSimilarAction,
  clearMovies as clearMoviesAction,
} from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';
import pageIsInt from '../helpers';

function Movie({
  movie,
  setMovie,
  clearMovie,
  baseUrl,
  imdbBaseUrl,
  movies,
  setMoviesSimilar,
  clearMovies,
}) {
  const { id, pageNum } = useParams();
  const basePath = `/movie/${id}`;

  useEffect(() => {
    setMovie(id);

    return () => clearMovie();
  }, [id, setMovie, clearMovie]);

  useEffect(() => {
    setMoviesSimilar(id, pageNum);

    return () => clearMovies();
  }, [id, pageNum, setMoviesSimilar, clearMovies]);

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movie.isPending) return <Spinner animation="border" />;

  const { crew } = movie.credits;
  const directors = crew.filter((member) => member.job === 'Director');

  return (
    <>
      <MovieDetails
        movie={movie}
        directors={directors}
        baseUrl={baseUrl}
        imdbBaseUrl={imdbBaseUrl}
      />
      <h3 className="mt-5 mb-5">Similar movies:</h3>
      {movies.isPending ? (
        <Spinner animation="border" />
      ) : (
        <MovieList movies={movies} baseUrl={baseUrl} basePath={basePath} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
    baseUrl: state.config.images.secure_base_url,
    imdbBaseUrl: state.config.imdbBaseUrl,
    movies: state.movies,
  };
};

const mapDispatchToProps = {
  setMovie: setMovieAction,
  clearMovie: clearMovieAction,
  setMoviesSimilar: setMoviesSimilarAction,
  clearMovies: clearMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
