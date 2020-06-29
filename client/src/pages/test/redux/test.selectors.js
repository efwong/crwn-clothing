import { createSelector } from 'reselect';

const selectTest = (state) => state.test;

export const selectTestValue = createSelector(
  [selectTest],
  (test) => test.value
);
