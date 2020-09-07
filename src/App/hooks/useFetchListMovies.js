import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMoviesList } from '../actions';

function useFetchListMovies() {
  const [movieIds, setMovieIds] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movieIds) {
      dispatch(setMoviesList(movieIds));
    }
  }, [dispatch, movieIds]);

  const fetchOnListChange = (items) => {
    if (!movieIds || movieIds.length !== items.length) setMovieIds(items);
  };

  return { fetchOnListChange };
}

export default useFetchListMovies;
