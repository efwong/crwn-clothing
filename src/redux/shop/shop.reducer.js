import SHOP_DATA from './shop.data';

const INITIAL_STATE = {
  collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // case typeName:
    //   return { ...state, ...payload };

    default:
      return state;
  }
};

export default shopReducer;
