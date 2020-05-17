import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseConfig } from './firebase.config';

firebase.initializeApp(FirebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // represents the location of the dataset in firestore not the data/json itself
  // will always be true even if no data
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // prompts user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
