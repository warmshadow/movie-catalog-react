import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMovie as setMovieAction } from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';

function Movie({ movie, setMovie }) {
  const { id } = useParams();

  useEffect(() => {
    setMovie(id);
  }, [id, setMovie]);

  if (movie.isPending) return <Spinner animation="border" />;

  const { crew } = movie.credits;
  const directors = crew.filter((member) => member.job === 'Director');

  const similarMovies = movie.similar.results;

  return (
    <>
      <MovieDetails movie={movie} directors={directors} />
      <h3>Similar movies:</h3>
      <MovieList movies={similarMovies} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  setMovie: setMovieAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
