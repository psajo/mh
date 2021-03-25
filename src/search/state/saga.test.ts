import { takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import searchSaga from './saga';

test('exact order with redux-saga-test-plan', () => {
  // const myFetch=
  // return testSaga(searchSaga).next().all(takeEvery('search/FETCH_AUTOCOMPLETES',));
});
