const movieReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'SET_MOVIE_PENDING':
      return { ...state, isPending: true };
    case 'SET_MOVIE':
      return { ...state, ...action.payload, isPending: false };
    default:
      return state;
  }
};

export default movieReducer;
