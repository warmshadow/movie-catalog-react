import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMoviesList, clearMovies } from '../actions';

function useFetchListMovies() {
  const [movieIds, setMovieIds] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movieIds) {
      dispatch(setMoviesList(movieIds));
    }
  }, [dispatch, movieIds]);

  useEffect(() => {
    return () => dispatch(clearMovies());
  }, [dispatch]);

  const fetchOnListChange = (items) => {
    if (
      !movieIds ||
      movieIds.length !== items.length ||
      !movieIds.every((val, idx) => val === items[idx])
    )
      setMovieIds(items);
  };

  return { fetchOnListChange };
}

export default useFetchListMovies;
