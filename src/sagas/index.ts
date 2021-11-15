import { all, fork } from 'redux-saga/effects';
import { subscribeGetCharacters, subscribeAddCustomization } from './heroes-saga';

export const saga = function* root() {
  yield all([
    fork(subscribeGetCharacters),
    fork(subscribeAddCustomization),
  ]);
};