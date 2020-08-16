const moviesReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'SET_MOVIES_PENDING':
      return { ...state, isPending: true };
    case 'SET_MOVIES':
      return { ...state, ...action.payload, isPending: false };
    default:
      return state;
  }
};

export default moviesReducer;
