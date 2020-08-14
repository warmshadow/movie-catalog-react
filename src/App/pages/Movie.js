import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMovie as setMovieAction } from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';

function Movie({ movie, setMovie, baseUrl, imdbBaseUrl }) {
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
      <MovieDetails
        movie={movie}
        directors={directors}
        baseUrl={baseUrl}
        imdbBaseUrl={imdbBaseUrl}
      />
      <h3>Similar movies:</h3>
      <MovieList movies={similarMovies} baseUrl={baseUrl} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
    baseUrl: state.config.images.secure_base_url,
    imdbBaseUrl: state.config.imdbBaseUrl,
  };
};

const mapDispatchToProps = {
  setMovie: setMovieAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
