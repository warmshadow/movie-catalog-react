import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMovie as setMovieAction, setMoviesSimilar as setMoviesSimilarAction } from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';
import pageIsInt from '../helpers';

function Movie({ movie, setMovie, baseUrl, imdbBaseUrl, movies, setMoviesSimilar, auth }) {
  const { id, pageNum } = useParams();
  const basePath = `/movie/${id}`;

  useEffect(() => {
    setMovie(id);
  }, [id, setMovie]);

  useEffect(() => {
    setMoviesSimilar(id, pageNum);
  }, [id, pageNum, setMoviesSimilar]);

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
        auth={auth}
      />
      <h3 className="mb-5">Similar movies:</h3>
      <MovieList movies={movies} baseUrl={baseUrl} basePath={basePath} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
    baseUrl: state.config.images.secure_base_url,
    imdbBaseUrl: state.config.imdbBaseUrl,
    movies: state.movies,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  setMovie: setMovieAction,
  setMoviesSimilar: setMoviesSimilarAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
