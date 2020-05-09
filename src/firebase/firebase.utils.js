import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseConfig } from './firebase.config';

firebase.initializeApp(FirebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // prompts user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
