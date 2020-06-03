import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

/**
 * Thunk adds side effects to actions
 * A function that returns a function with access to dispatch. Allowing you to add conditions to dispatch other actions,
 * and handle async code inside it.
 */
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// persisted version of store
export const persistor = persistStore(store);
