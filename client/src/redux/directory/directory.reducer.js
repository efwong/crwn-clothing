import { sections } from './../../directory-data';

const INITIAL_STATE = {
  sections: sections
};

const directoryReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default directoryReducer;
