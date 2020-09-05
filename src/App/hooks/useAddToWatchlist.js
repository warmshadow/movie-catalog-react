import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMovieToWatchlist } from '../actions';

function useAddToWatchlist() {
  const auth = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const addToWatchlist = (movie) => {
    if (auth.uid) {
      dispatch(addMovieToWatchlist(movie));
    } else history.push('/signin');
  };

  return addToWatchlist;
}

export default useAddToWatchlist;
