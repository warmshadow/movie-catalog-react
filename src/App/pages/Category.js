import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {
  setMoviesCategory as setMoviesCategoryAction,
  clearMovies as clearMoviesAction,
} from '../actions';
import MovieList from '../components/MovieList';
import ListsModal from '../components/ListsModal';
import pageIsInt from '../helpers';
import useAddToList from '../hooks/useAddToList';
import useAddToWatchlist from '../hooks/useAddToWatchlist';

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

function Category({ movies, baseUrl, setMoviesCategory, clearMovies }) {
  const { title, pageNum } = useParams();
  const basePath = `/category/${title}`;

  const { handleAdd, handleClose, selectedMovie, showModal } = useAddToList();
  const addToWatchlist = useAddToWatchlist();

  useEffect(() => {
    if (CATEGORIES[title]) {
      const { params } = CATEGORIES[title];
      setMoviesCategory(params, pageNum);
    }

    return () => clearMovies();
  }, [title, pageNum, setMoviesCategory, clearMovies]);

  if (!CATEGORIES[title]) return <Redirect to="/notfound" />;

  if (!pageIsInt(pageNum)) return <Redirect to="/notfound" />;

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <>
      <h2 className="font-italic mt-3 mb-5">{`${CATEGORIES[title].name} MOVIES`}</h2>
      <MovieList
        movies={movies}
        baseUrl={baseUrl}
        basePath={basePath}
        addToList={handleAdd}
        addToWatchlist={addToWatchlist}
      />
      <ListsModal show={showModal} item={selectedMovie} handleClose={handleClose} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  setMoviesCategory: setMoviesCategoryAction,
  clearMovies: clearMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
