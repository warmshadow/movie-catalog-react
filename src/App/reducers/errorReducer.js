const errorReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      if (!action.payload) {
        return null;
      }
      console.log(action.payload.status_message || action.payload.code || action.payload.errors);
      return action.payload;
    case 'CLEAR_ERROR':
      return null;
    default:
      return state;
  }
};

export default errorReducer;
