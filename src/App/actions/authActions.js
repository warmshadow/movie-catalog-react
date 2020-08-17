export const signIn = (credentials) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
    dispatch({ type: 'SIGNIN_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGNIN_ERROR', err });
  }
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    await firebase.auth().signOut();
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGNOUT_ERROR', err });
  }
};
