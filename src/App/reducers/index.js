import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import mediaListsReducer from './mediaListsReducer';

export default combineReducers({
  auth: authReducer,
  config: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  mediaLists: mediaListsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
