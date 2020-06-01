import ShopActionsTypes from './shop.types';
const INITIAL_STATE = {
  collections: null
};

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // case typeName:
    //   return { ...state, ...payload };

    case ShopActionsTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: payload
      };

    default:
      return state;
  }
};

export default shopReducer;
