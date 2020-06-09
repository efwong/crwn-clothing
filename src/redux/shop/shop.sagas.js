import { takeEvery, call, put } from 'redux-saga/effects';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from './../../firebase/firebase.utils';

import ShopActionsTypes from './shop.types';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

/**
 * call: https://redux-saga.js.org/docs/basics/DeclarativeEffects.html
 * Allows you to defer fall to the given function until it returns.
 * Using call, the function will not be executed immediately.
 * If instead we yielded the convertCollectionsSnapshotToMap directly, we would execute immediately.
 * Benefit of using call, is easier testing.
 *
 *
 * We're using now the call(fn, ...args) function. The difference from the preceding example is that now we're not executing the fetch call immediately, instead, * call creates a description of the effect. Just as in Redux you use action creators to create a plain object describing the action that will get executed by the * Store, call creates a plain object describing the function call. The redux-saga middleware takes care of executing the function call and resuming the generator * with the resolved response.
 *
 * (eg.) yield call([obj, obj.method], arg1, arg2, ...)
 * Apply works as well for an array param
 * (eg.) yield apply(obj, obj.method, [arg1, arg2, ...])
 *
 * @param1: function to call
 * @param2: parameters for function in param1
 */

export function* fetchCollectionsAsync() {
  yield console.log('I am fired async');

  try {
    const collectionRef = firestore.collection('collections');

    // When collectionref grabs the value asyncronously, yield would return the contents of the promise
    // in this case it would be the snapshot value and not the promise
    // kind of like async await
    const snapshot = yield collectionRef.get();
    // can be called this way too: yield convertCollectionsSnapshotToMap(snapshot)
    console.log('begin call to convertCollectionsSnapshotToMap');
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // const collectionsMap = yield convertCollectionsSnapshotToMap(snapshot);
    console.log('collectionsmap', collectionsMap);

    // put is like dispatch but needs to be yielded
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  // collectionRef
  //   .get()
  //   .then((snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  console.log('SAGA: fetchCollectionsStart');
  // TakeEvery: listens to action with FETCH_COLLECTIONS_START,then triggers fetchCollectionsAsync
  // @param1: action that triggers
  // @param2: fires when action is called
  yield takeEvery(
    ShopActionsTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
