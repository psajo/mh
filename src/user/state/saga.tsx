import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeEvery
} from 'redux-saga/effects';
import { callApi } from '../../common/util/api';
import { fetchAutoCompletesAC } from '../../search/state/ducks';
// import { actions, Types } from '.';
import { FETCH_USER, setUserAC } from './ducks';

function* fetchUser({ payload }: ReturnType<typeof fetchAutoCompletesAC>) {
  // const name = payload.name;
  const { keyword } = payload;
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword }
  });
  if (isSuccess && data) {
    const user = data.find((item: UserData) => item.name === keyword);
    if (user) {
      // yield put(actions.setValue('user', user));
      yield put(setUserAC(user));
    }
  }
}

export default function* userSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([
    takeEvery(FETCH_USER, fetchUser)
    // takeEvery(Types.FetchUser, fetchUser)
    //   makeFetchSaga({fetchSaga: fetchUser, canCache: true}))
  ]);
}
