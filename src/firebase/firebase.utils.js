import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC3VccY1O7Wpu-yRJdKxWjuCNJkQFbbYP8',
  authDomain: 'crwn-service.firebaseapp.com',
  databaseURL: 'https://crwn-service.firebaseio.com',
  projectId: 'crwn-service',
  storageBucket: 'crwn-service.appspot.com',
  messagingSenderId: '686037421637',
  appId: '1:686037421637:web:3f3b2e56b74df3caf29d2c',
  measurementId: 'G-F22NJEWGJ5',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // prompts user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
