import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMoviesSearch as setMoviesSearchAction } from '../actions';
import MovieList from '../components/MovieList';
import ListsModal from '../components/ListsModal';
import pageIsInt from '../helpers';

function Search({ auth, movies, setMoviesSearch, baseUrl }) {
  const { title, pageNum } = useParams();
  const basePath = `/search/${title}`;

  // Add to List modal window logic
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleAdd = (movie) => {
    if (auth.uid) {
      setSelectedMovie(movie);
      setShowModal(true);
    } else history.push('/signin');
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    setMoviesSearch(title, pageNum);
  }, [title, pageNum, setMoviesSearch]);

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2 className="mt-3">{title}</h2>
      <h3 className="mb-5">results</h3>
      <MovieList movies={movies} baseUrl={baseUrl} basePath={basePath} addToList={handleAdd} />
      <ListsModal show={showModal} movie={selectedMovie} handleClose={handleClose} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  setMoviesSearch: setMoviesSearchAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
