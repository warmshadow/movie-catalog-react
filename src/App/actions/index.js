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
    dispatch({ type: 'CREATE_MEDIA_LIST_ERROR' });
  }
};

const deleteMediaList = (list) => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    await firestore.collection('mediaLists').doc(list.id).delete();

    dispatch({ type: 'DELETE_MEDIA_LIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'DELETE_MEDIA_LIST_ERROR' });
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
    dispatch({ type: 'ADD_MOVIE_ERROR' });
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
    dispatch({ type: 'REMOVE_MOVIE_ERROR', payload: err });
  }
};

const addMovieToWatchlist = (movie) => async (dispatch, getState, { getFirestore }) => {
  const { id } = movie;
  const { uid } = getState().firebase.auth;
  try {
    const firestore = getFirestore();
    await firestore
      .collection('watchlists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayUnion({ id }),
      });
    dispatch({ type: 'ADD_MOVIE_WATCHLIST_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'ADD_MOVIE_WATCHLIST_ERROR' });
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
    dispatch({ type: 'REMOVE_MOVIE_WATCHLIST_ERROR', payload: err });
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
    dispatch({ type: 'SET_RATING_ERROR', payload: err });
  }
};

const removeRating = (item) => async (dispatch, getState, { getFirestore }) => {
  const { id } = item;
  try {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;
    await firestore
      .collection('usersRatings')
      .doc(uid)
      .update({ [`items.${id}`]: firestore.FieldValue.delete() });
    await firestore
      .collection('ratingsLists')
      .doc(uid)
      .update({
        items: firestore.FieldValue.arrayRemove({ id }),
      });
    dispatch({ type: 'REMOVE_RATING_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'REMOVE_RATING_ERROR', payload: err });
  }
};

export {
  setConfig,
  setMoviesCategory,
  setMoviesSearch,
  setMovie,
  setMoviesSimilar,
  createMediaList,
  deleteMediaList,
  addMovieToList,
  removeMovieFromList,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  setRating,
  removeRating,
};
