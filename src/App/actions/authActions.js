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

export const signUp = (newUser) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    if (!newUser.firstName.trim()) {
      throw new Error('First name cannot be empty.');
    }

    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    await firestore.collection('users').doc(res.user.uid).set({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
    dispatch({ type: 'SIGNUP_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGNUP_ERROR', err });
  }
};

export const clearAuthError = () => {
  return {
    type: 'CLEAR_AUTH_ERROR',
  };
};
