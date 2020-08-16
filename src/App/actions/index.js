import tmdb from '../api/tmdb';

const setConfig = () => async (dispatch) => {
  const res = await tmdb.get('/configuration');
  dispatch({ type: 'SET_CONFIG', payload: res.data });
};

const setMoviesCategory = (params, pageNum) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIES_PENDING' });

  const res = await tmdb.get('/discover/movie', {
    params: { ...params, page: pageNum },
  });
  dispatch({ type: 'SET_MOVIES', payload: res.data });
};

const setMoviesSearch = (title, pageNum) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIES_PENDING' });

  const res = await tmdb.get('/search/movie', {
    params: {
      query: title,
      page: pageNum,
    },
  });
  dispatch({ type: 'SET_MOVIES', payload: res.data });
};

const setMovie = (id) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIE_PENDING' });

  const res = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  });
  dispatch({ type: 'SET_MOVIE', payload: res.data });
};

const setMoviesSimilar = (id, pageNum) => async (dispatch) => {
  dispatch({ type: 'SET_MOVIES_PENDING' });

  const res = await tmdb.get(`/movie/${id}/similar`, {
    params: {
      page: pageNum,
    },
  });
  dispatch({ type: 'SET_MOVIES', payload: res.data });
};

const createUserMovieList = (list) => async (dispatch, getState, { getFirestore }) => {
  // make async call to db
  try {
    const firestore = getFirestore();
    await firestore.collection('lists').add({
      ...list,
      userId: 101,
      createdAt: new Date(),
    });
    dispatch({ type: 'CREATE_MOVIE_LIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'CREATE_MOVIE_LIST_ERROR' });
  }
};

export {
  setConfig,
  setMoviesCategory,
  setMoviesSearch,
  setMovie,
  setMoviesSimilar,
  createUserMovieList,
};
