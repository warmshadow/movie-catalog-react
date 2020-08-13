import tmdb from '../api/tmdb';

const setConfig = () => async (dispatch) => {
  const res = await tmdb.get('/configuration');
  dispatch({ type: 'SET_CONFIG', payload: res.data });
};

const setMovieListSearch = (title) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIE_LIST_PENDING' });

  const res = tmdb.get('/search/movie', {
    params: {
      query: title,
    },
  });
  dispatch({ type: 'SET_MOVIE_LIST', payload: res.data });
};

export { setConfig, setMovieListSearch };
