import { SET_CURRENT_USER } from './user.actions';
const INITIAL_STATE = {
  currentUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const { payload } = action;
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
