import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import userMovieListsReducer from './userMovieListsReducer';

export default combineReducers({
  config: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  userMovieLists: userMovieListsReducer,
  firestore: firestoreReducer,
});
