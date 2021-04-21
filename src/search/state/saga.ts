import {
  all,
  put,
  call,
  takeEvery,
  AllEffect,
  ForkEffect
} from 'redux-saga/effects';
// import { actions, Types} from './index';
import {
  setAutoCompletesAC,
  FETCH_AUTOCOMPLETES,
  fetchAutoCompletesAC
} from './ducks';
import { callApi } from '../../common/util/api';

export function* fetchAutoComplete({
  payload
}: ReturnType<typeof fetchAutoCompletesAC>) {
  const { keyword } = payload;
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword }
  });
  if (isSuccess && data) {
    yield put(setAutoCompletesAC(data));
  }
}

export default function* searchSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([takeEvery(FETCH_AUTOCOMPLETES, fetchAutoComplete)]);
}
