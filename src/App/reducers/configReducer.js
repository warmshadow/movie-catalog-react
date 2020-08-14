const INITIAL_STATE = {
  imdbBaseUrl: 'https://www.imdb.com/title/',
  isPending: true,
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload, isPending: false };
    default:
      return state;
  }
};

export default configReducer;
