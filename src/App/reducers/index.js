import { combineReducers } from 'redux';
import configReducer from './configReducer';
import movieListReducer from './movieListReducer';

export default combineReducers({
  config: configReducer,
  movieList: movieListReducer,
});
