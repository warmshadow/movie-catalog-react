const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
      console.log('signin error');
      return { ...state, authError: action.err.message };
    case 'SIGNIN_SUCCESS':
      console.log('signin success');
      return { ...state, authError: null };
    case 'SIGNOUT_SUCCESS':
      console.log('signOut success');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('signOut error');
      return { ...state, authError: action.err.message };
    case 'SIGNUP_SUCCESS':
      console.log('signUp success');
      return { ...state, authError: null };
    case 'SIGNUP_ERROR':
      console.log('signUp error');
      return { ...state, authError: action.err.message };
    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
