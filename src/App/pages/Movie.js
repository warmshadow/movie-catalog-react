import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {
  setMovie as setMovieAction,
  setMoviesSimilar as setMoviesSimilarAction,
  clearMovies as clearMoviesAction,
} from '../actions';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';
import ListsModal from '../components/ListsModal';
import pageIsInt from '../helpers';
import useAddToList from '../hooks/useAddToList';
import useAddToWatchlist from '../hooks/useAddToWatchlist';

function Movie({ movie, setMovie, baseUrl, imdbBaseUrl, movies, setMoviesSimilar, clearMovies }) {
  const { id, pageNum } = useParams();
  const basePath = `/movie/${id}`;

  const { handleAdd, handleClose, selectedMovie, showModal } = useAddToList();
  const addToWatchlist = useAddToWatchlist();

  useEffect(() => {
    setMovie(id);
  }, [id, setMovie]);

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
        addToList={handleAdd}
        addToWatchlist={addToWatchlist}
      />
      <h3 className="mt-5 mb-5">Similar movies:</h3>
      {movies.isPending ? (
        <Spinner animation="border" />
      ) : (
        <MovieList
          movies={movies}
          baseUrl={baseUrl}
          basePath={basePath}
          addToList={handleAdd}
          addToWatchlist={addToWatchlist}
        />
      )}
      <ListsModal show={showModal} item={selectedMovie} handleClose={handleClose} />
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
  clearMovies: clearMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
