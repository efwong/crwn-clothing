import TestActionsTypes from './test.types';
const INITIAL_STATE = {
  value: 0
};

const testReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TestActionsTypes.INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };

    case TestActionsTypes.DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };

    default:
      return state;
  }
};

export default testReducer;
