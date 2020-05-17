import CartActionTypes from './cart.types';

export const toggleCartHidden = (payload) => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (payload) => ({
  type: CartActionTypes.ADD_ITEM,
  payload
});
