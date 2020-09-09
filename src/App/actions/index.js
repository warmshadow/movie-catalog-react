import tmdb from '../api/tmdb';

const setConfig = () => async (dispatch) => {
  try {
    const res = await tmdb.get('/configuration');
    dispatch({ type: 'SET_CONFIG', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
    // reset isPending to false so App component renders routes
    dispatch({ type: 'RESET_CONFIG_ON_ERROR' });
  }
};

const setMoviesCategory = (category, pageNum) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${category}`, {
      params: { page: pageNum },
    });
    dispatch({ type: 'SET_MOVIES', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
  }
};

const setMoviesSearch = (title, pageNum) => async (dispatch) => {
  try {
    const res = await tmdb.get('/search/movie', {
      params: {
        query: title,
        page: pageNum,
      },
    });
    dispatch({ type: 'SET_MOVIES', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
  }
};

const setMovie = (id) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits',
      },
    });
    dispatch({ type: 'SET_MOVIE', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
  }
};

const clearMovie = () => {
  return {
    type: 'SET_MOVIE_PENDING',
  };
};

const setMoviesSimilar = (id, pageNum) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${id}/similar`, {
      params: {
        page: pageNum,
      },
    });
    dispatch({ type: 'SET_MOVIES', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
  }
};

const fetchMovie = async (movie) => {
  const res = await tmdb.get(`/movie/${movie.id}`);
  return res.data;
};
const setMoviesList = (movieIds) => async (dispatch) => {
  try {
    const movies = {};
    const fetchMovies = movieIds.map(fetchMovie);
    movies.items = await Promise.all(fetchMovies);

    dispatch({ type: 'SET_MOVIES', payload: movies });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.response.data });
  }
};

const clearMovies = () => {
  return {
    type: 'SET_MOVIES_PENDING',
  };
};

const createMediaList = (list) => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    await firestore.collection('mediaLists').add({
      ...list,
      userId,
      items: [],
      createdAt: new Date(),
    });
    dispatch({ type: 'CREATE_MEDIA_LIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const deleteMediaList = (list) => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    await firestore.collection('mediaLists').doc(list.id).delete();

    dispatch({ type: 'DELETE_MEDIA_LIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const addMovieToList = (listId, movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    await firestore
      .collection('mediaLists')
      .doc(listId)
      .update({
        items: firestore.FieldValue.arrayUnion({ id }),
      });
    dispatch({ type: 'ADD_MOVIE_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const removeMovieFromList = (listId, movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    await firestore
      .collection('mediaLists')
      .doc(listId)
      .update({
        items: firestore.FieldValue.arrayRemove({ id }),
      });
    dispatch({ type: 'REMOVE_MOVIE_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const addMovieToWatchlist = (movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const { uid } = getState().firebase.auth;
    const firestore = getFirestore();
    await firestore
      .collection('watchlists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayUnion({ id }),
      });
    dispatch({ type: 'ADD_MOVIE_WATCHLIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const removeMovieFromWatchlist = (movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore
      .collection('watchlists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayRemove({ id }),
      });
    dispatch({ type: 'REMOVE_MOVIE_WATCHLIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const setRating = (rating, item) => async (dispatch, getState, { getFirestore }) => {
  const { id } = item;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore
      .collection('usersRatings')
      .doc(uid)
      .update({ [`items.${id}`]: rating });
    await firestore
      .collection('ratingsLists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayUnion({ id }),
      });
    dispatch({ type: 'SET_RATING_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const removeRating = (item) => async (dispatch, getState, { getFirestore }) => {
  const { id } = item;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore
      .collection('ratingsLists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayRemove({ id }),
      });
    await firestore
      .collection('usersRatings')
      .doc(uid)
      .update({ [`items.${id}`]: firestore.FieldValue.delete() });
    dispatch({ type: 'REMOVE_RATING_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};

export {
  setConfig,
  setMoviesCategory,
  setMoviesSearch,
  setMovie,
  clearMovie,
  setMoviesSimilar,
  setMoviesList,
  clearMovies,
  createMediaList,
  deleteMediaList,
  addMovieToList,
  removeMovieFromList,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  setRating,
  removeRating,
  clearError,
};
