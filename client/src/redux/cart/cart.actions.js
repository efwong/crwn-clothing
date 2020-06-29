import CartActionTypes from './cart.types';

export const toggleCartHidden = (payload) => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (payload) => ({
  type: CartActionTypes.ADD_ITEM,
  payload
});

export const removeItem = (payload) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});
