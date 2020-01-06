/**
 * Selectors memoizes selected properties of the state
 */

import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => {
    console.log('cartItems', cartItems);
    return cartItems.reduce((acc, cur) => acc + (cur.quantity || 1), 0);
  }
);
