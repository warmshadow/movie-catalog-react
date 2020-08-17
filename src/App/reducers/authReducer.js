const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
      console.log('signin error');
      return { ...state, authError: 'SignIn failed' };
    case 'SIGNIN_SUCCESS':
      console.log('signin success');
      return { ...state, authError: null };
    case 'SIGNOUT_SUCCESS':
      console.log('signOut success');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('signOut error');
      return { ...state, authError: 'SignOut failed' };
    default:
      return state;
  }
};

export default authReducer;
