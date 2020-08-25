import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setMoviesCategory as setMoviesCategoryAction } from '../actions';
import MovieList from '../components/MovieList';
import ListsModal from '../components/ListsModal';
import pageIsInt from '../helpers';

const CATEGORIES = {
  toprated: {
    route: 'toprated',
    name: 'Top Rated',
    params: {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 200,
    },
  },
  popular: {
    name: 'Popular',
    params: {
      sort_by: 'popularity.desc',
    },
  },
  documentary: {
    name: 'Documentary',
    params: {
      with_genres: '99',
      sort_by: 'vote_average.desc',
      'vote_count.gte': 200,
    },
  },
  lithuanian: {
    name: 'Lithuanian',
    params: {
      with_original_language: 'lt',
    },
  },
};

function Category({ auth, movies, baseUrl, setMoviesCategory }) {
  const { title, pageNum } = useParams();
  const basePath = `/category/${title}`;

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
    if (CATEGORIES[title]) {
      const { params } = CATEGORIES[title];
      setMoviesCategory(params, pageNum);
    }
  }, [title, pageNum, setMoviesCategory]);

  if (!CATEGORIES[title]) return <Redirect to="/notfound" />;

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2 className="font-italic mt-3 mb-5">{`${CATEGORIES[title].name} MOVIES`}</h2>
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
  setMoviesCategory: setMoviesCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
