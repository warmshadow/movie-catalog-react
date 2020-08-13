const configReducer = (state = { isPending: true }, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload, isPending: false };
    default:
      return state;
  }
};

export default configReducer;
