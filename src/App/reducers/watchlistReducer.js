const watchlistReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_WATCHLIST_SUCCESS':
      // temporary alert
      alert('successfully added movie to watchlist');
      return state;
    case 'ADD_MOVIE_WATCHLIST_ERROR':
      console.log('error adding movie to watchlist', action.payload);
      return state;
    case 'REMOVE_MOVIE_WATCHLIST_SUCCESS':
      // temporary alert
      alert('successfully removed movie from watchlist');
      return state;
    case 'REMOVE_MOVIE_WATCHLIST_ERROR':
      console.log('error removing movie from watchlist', action.payload);
      return state;
    default:
      return state;
  }
};

export default watchlistReducer;
