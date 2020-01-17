import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// this gets default windows local storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // array of names of reducer that we want to store & persist betweens essions
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// modified rootReducer with persit ability from persistConfig
export default persistReducer(persistConfig, rootReducer);
