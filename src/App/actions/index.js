import * as types from './types';
import tmdb from '../api/tmdb';

const setConfig = () => async (dispatch) => {
  try {
    const res = await tmdb.get('/configuration');
    dispatch({ type: types.SET_CONFIG, payload: res.data });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
    // reset isPending to false so App component renders routes
    dispatch({ type: types.RESET_CONFIG_ON_ERROR });
  }
};

const setMoviesCategory = (category, pageNum) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${category}`, {
      params: { page: pageNum },
    });
    dispatch({ type: types.SET_MOVIES, payload: res.data });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
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
    dispatch({ type: types.SET_MOVIES, payload: res.data });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
  }
};

const setMovie = (id) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits',
      },
    });
    dispatch({ type: types.SET_MOVIE, payload: res.data });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
  }
};

const clearMovie = () => {
  return {
    type: types.SET_MOVIE_PENDING,
  };
};

const setMoviesSimilar = (id, pageNum) => async (dispatch) => {
  try {
    const res = await tmdb.get(`/movie/${id}/similar`, {
      params: {
        page: pageNum,
      },
    });
    dispatch({ type: types.SET_MOVIES, payload: res.data });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
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
    movies.results = await Promise.all(fetchMovies);

    dispatch({ type: types.SET_MOVIES, payload: movies });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err.response.data });
  }
};

const clearMovies = () => {
  return {
    type: types.SET_MOVIES_PENDING,
  };
};

const createMediaList = (list) => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    await firestore.collection('mediaLists').add({
      ...list,
      userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    dispatch({ type: types.CREATE_MEDIA_LIST_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const deleteMediaList = (list) => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    await firestore.collection('mediaLists').doc(list.id).delete();

    dispatch({ type: types.DELETE_MEDIA_LIST_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const addMovieToList = (listId, movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    await firestore
      .collection('mediaLists')
      .doc(listId)
      .collection('movies')
      .doc(`${id}`)
      .set({ id: `${id}`, createdAt: firestore.FieldValue.serverTimestamp() });
    dispatch({ type: types.ADD_MOVIE_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const removeMovieFromList = (listId, movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    await firestore.collection('mediaLists').doc(listId).collection('movies').doc(`${id}`).delete();
    dispatch({ type: types.REMOVE_MOVIE_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
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
      .collection('movies')
      .doc(`${id}`)
      .set({ id: `${id}`, createdAt: firestore.FieldValue.serverTimestamp() });
    dispatch({ type: types.ADD_MOVIE_WATCHLIST_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const removeMovieFromWatchlist = (movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore.collection('watchlists').doc(uid).collection('movies').doc(`${id}`).delete();
    dispatch({ type: types.REMOVE_MOVIE_WATCHLIST_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const setRating = (rating, movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore
      .collection('usersRatings')
      .doc(`${id}_${uid}`)
      .set({ movieId: id, userId: uid, rating, createdAt: firestore.FieldValue.serverTimestamp() });
    await firestore
      .collection('ratingsLists')
      .doc(uid)
      .collection('movies')
      .doc(`${id}`)
      .set({ id: `${id}`, createdAt: firestore.FieldValue.serverTimestamp() });
    dispatch({ type: types.SET_RATING_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const removeRating = (movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore.collection('ratingsLists').doc(uid).collection('movies').doc(`${id}`).delete();
    await firestore.collection('usersRatings').doc(`${id}_${uid}`).delete();
    dispatch({ type: types.REMOVE_RATING_SUCCESS });
  } catch (err) {
    dispatch({ type: types.SET_ERROR, payload: err });
  }
};

const clearError = () => {
  return {
    type: types.CLEAR_ERROR,
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
