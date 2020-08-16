import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMovie as setMovieAction, setMoviesSimilar as setMoviesSimilarAction } from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';

function Movie({ movie, setMovie, baseUrl, imdbBaseUrl, movies, setMoviesSimilar }) {
  const { id, pageNum } = useParams();
  const basePath = `/movie/${id}`;

  useEffect(() => {
    setMovie(id);
  }, [id, setMovie]);

  useEffect(() => {
    setMoviesSimilar(id, pageNum);
  }, [id, pageNum, setMoviesSimilar]);

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
      <h3>Similar movies:</h3>
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
  };
};

const mapDispatchToProps = {
  setMovie: setMovieAction,
  setMoviesSimilar: setMoviesSimilarAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
