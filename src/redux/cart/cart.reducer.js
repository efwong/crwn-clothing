import CartActionTypes from './cart.types';
const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case CartActionTypes.ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, payload] };

    default:
      return state;
  }
};

export default cartReducer;
