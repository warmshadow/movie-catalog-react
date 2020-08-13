import tmdb from '../api/tmdb';

const setConfig = () => async (dispatch) => {
  const res = await tmdb.get('/configuration');
  dispatch({ type: 'SET_CONFIG', payload: res.data });
};

const setMovieListSearch = (title) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIE_LIST_PENDING' });

  const res = await tmdb.get('/search/movie', {
    params: {
      query: title,
    },
  });
  dispatch({ type: 'SET_MOVIE_LIST', payload: res.data });
};

const setMovie = (id) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIE_PENDING' });

  const res = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,similar',
    },
  });
  dispatch({ type: 'SET_MOVIE', payload: res.data });
};

export { setConfig, setMovieListSearch, setMovie };
