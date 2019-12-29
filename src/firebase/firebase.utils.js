import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBwDqKcehMpjb02We3oWQkqx8g0c1I0csA',
  authDomain: 'crwn-db-3b4ff.firebaseapp.com',
  databaseURL: 'https://crwn-db-3b4ff.firebaseio.com',
  projectId: 'crwn-db-3b4ff',
  storageBucket: 'crwn-db-3b4ff.appspot.com',
  messagingSenderId: '79045650306',
  appId: '1:79045650306:web:3064403fa7650edd8d919b',
  measurementId: 'G-FQ4PVEE2G8'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // trigger google popup when authenticating
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
