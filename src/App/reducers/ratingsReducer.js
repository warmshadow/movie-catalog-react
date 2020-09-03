const ratingsReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'SET_RATING_SUCCESS':
      // temporary alert
      alert('successfully set a movie rating');
      return state;
    case 'SET_RATING_ERROR':
      console.log('error setting movie rating', action.payload);
      return state;
    default:
      return state;
  }
};

export default ratingsReducer;
