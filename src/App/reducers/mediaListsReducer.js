const mediaListsReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'CREATE_MEDIA_LIST_SUCCESS':
      // temporary alert
      alert('successfully created media list');
      return state;
    case 'CREATE_MEDIA_LIST_ERROR':
      console.log('error in creating media list');
      return state;
    case 'DELETE_MEDIA_LIST_SUCCESS':
      // temporary alert
      alert('successfully deleted media list');
      return state;
    case 'DELETE_MEDIA_LIST_ERROR':
      console.log('error in deleting media list');
      return state;
    case 'ADD_MOVIE_SUCCESS':
      // temporary alert
      alert('successfully added movie to list');
      return state;
    case 'ADD_MOVIE_ERROR':
      console.log('error adding movie to list');
      return state;
    case 'REMOVE_MOVIE_SUCCESS':
      // temporary alert
      alert('successfully removed movie from list');
      return state;
    case 'REMOVE_MOVIE_ERROR':
      console.log('error removing movie from list', action.payload);
      return state;
    default:
      return state;
  }
};

export default mediaListsReducer;
