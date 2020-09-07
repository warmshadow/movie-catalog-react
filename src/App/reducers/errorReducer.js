const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      if (!action.payload) {
        return {};
      }
      console.log(action.payload.status_message || action.payload.code || action.payload.errors);
      return action.payload;
    case 'CLEAR_ERROR':
      return {};
    default:
      return state;
  }
};

export default errorReducer;
