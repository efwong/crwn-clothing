import { takeLatest, take, takeEvery, delay, put } from 'redux-saga/effects';
import TestActionsTypes from './test.types';

/**
 * Take: waits for action to happen then can get payload from this action
 * Will only trigger for the first action.  You cannot restart sagas.
 */
// export function* incrementSaga() {
//   console.log('SAGA: incrementSaga');
//   const incrementPayload = yield take(TestActionsTypes.INCREMENT);
//   console.log('incrementPayload', incrementPayload);
// }

export function* onIncrmement() {
  yield console.log('onIncrement!');
  yield delay(2000);
  // fires after 3 sec
  yield put({ type: TestActionsTypes.INCREMEN_FROM_SAGA });
}

/**
 * TakeEvery: kicks off a new saga using the generator that is passed to it as the second argument for every increment action that comes in
 * Will spawn new saga for every time the action is triggered
 *
 * TakeLatest: throttles actions and only fires on latest action. Previous actions that are still running will be cancelled. A new saga task will be created.
 */
export function* incrementSaga() {
  // yield takeEvery(TestActionsTypes.INCREMENT, onIncrmement);
  yield takeLatest(TestActionsTypes.INCREMENT, onIncrmement);
}
