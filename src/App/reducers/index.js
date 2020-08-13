import { combineReducers } from 'redux';
import configReducer from './configReducer';
import movieListReducer from './movieListReducer';
import movieReducer from './movieReducer';

export default combineReducers({
  config: configReducer,
  movieList: movieListReducer,
  movie: movieReducer,
});
