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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURIComponent(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export default firebase;

/**
 * Code to upload shop data to firestore
 */
// addCollectionAndDocuments(
//   'collections',
//   collectionsArray.map(({ title, items }) => ({ title, items }))
// ).then((result) => {
//   console.log('result', result);
// });
// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);
//   console.log('collectionref', collectionRef);
//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });
//   return await batch.commit();
// };
