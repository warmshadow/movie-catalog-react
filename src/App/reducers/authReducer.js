const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
    case 'SIGNOUT_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, authError: action.err.message };
    case 'SIGNIN_SUCCESS':
    case 'SIGNOUT_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
