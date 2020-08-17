import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import userMovieListsReducer from './userMovieListsReducer';

export default combineReducers({
  auth: authReducer,
  config: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  userMovieLists: userMovieListsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
