import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// input selector takes state and returns a slice
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  }
);
