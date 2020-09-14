const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const createRatingsList = (user, list) => {
  return admin.firestore().collection('ratingsLists').doc(user.uid).set(list);
};

const createWatchlist = (user, list) => {
  return admin.firestore().collection('watchlists').doc(user.uid).set(list);
};

const createInitialLists = (user, list) => {
  return Promise.all([createRatingsList(user, list), createWatchlist(user, list)]).then(() =>
    console.log('Created initial lists for user')
  );
};

exports.userJoined = functions.auth.user().onCreate((user) => {
  const list = { createdAt: admin.firestore.FieldValue.serverTimestamp(), userId: user.uid };

  return createInitialLists(user, list);
});
