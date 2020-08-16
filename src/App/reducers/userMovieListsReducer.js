const userMovieListsReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'CREATE_MOVIE_LIST_SUCCESS':
      console.log('successfully created movie list');
      return state;
    case 'CREATE_MOVIE_LIST_ERROR':
      console.log('error in creating movie list');
      return state;
    default:
      return state;
  }
};

export default userMovieListsReducer;
