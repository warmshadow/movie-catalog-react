import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from './authReducer';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import mediaListsReducer from './mediaListsReducer';
import ratingsReducer from './ratingsReducer';
import watchlistReducer from './watchlistReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  config: configReducer,
  error: errorReducer,
  movies: moviesReducer,
  movie: movieReducer,
  mediaLists: mediaListsReducer,
  ratings: ratingsReducer,
  watchlist: watchlistReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  toastr: toastrReducer,
});
