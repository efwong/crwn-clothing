import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { incrementSaga } from '../pages/test/redux/test.saga';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  /**
   * yield all allows all sagas to run asynchronously and not block each other.
   * You can achieve a similar affect by yielding individual sagas, but then they will be blocking each other
   */
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas),
    call(incrementSaga)
  ]);
}
