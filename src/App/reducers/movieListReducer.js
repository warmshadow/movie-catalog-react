const movieListReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'SET_MOVIE_LIST_PENDING':
      return { ...state, isPending: true };
    case 'SET_MOVIE_LIST':
      return { ...state, ...action.payload, isPending: false };
    default:
      return state;
  }
};

export default movieListReducer;
