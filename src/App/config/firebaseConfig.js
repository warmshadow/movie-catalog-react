import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhXxMJvu09jPN-ylW8n5fUwEfmemuRfo4',
  authDomain: 'lowkey-movie-catalog.firebaseapp.com',
  databaseURL: 'https://lowkey-movie-catalog.firebaseio.com',
  projectId: 'lowkey-movie-catalog',
  storageBucket: 'lowkey-movie-catalog.appspot.com',
  messagingSenderId: '694936042184',
  appId: '1:694936042184:web:0a308f07a458e82ad6c3fd',
  measurementId: 'G-YHLXG6M7KY',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
