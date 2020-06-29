import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

/**
 * DEPRECATED
 * Thunk adds side effects to actions
 * A function that returns a function with access to dispatch. Allowing you to add conditions to dispatch other actions,
 * and handle async code inside it.
 */
// const middlewares = [thunk];
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// persisted version of store
export const persistor = persistStore(store);
