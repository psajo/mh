import { all } from '@redux-saga/core/effects';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import myUserReducer from '../../user/state/ducks';
import mySearchReducer from '../state/ducks';
import SearchInput from './SearchInput';
import searchSaga from '../../search/state/saga';
import userSaga from '../../user/state/saga';

// jest.mock('../../common/util/api', () =>
//   new Promise((resolve, reject) => {
//     setTimeout(
//       () =>
//         resolve({
//           isSuccess: true,
//           data: [
//             {
//               name: 'user12',
//               tag: 'study',
//               department: 'dst'
//             }
//           ],
//           resultCode: 200,
//           resultMessage: 'what'
//         }),
//       2000
//     );
//   }).then(value => value)
// );
let store: any;

beforeEach(() => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const reducer = combineReducers({
    search: mySearchReducer,
    user: myUserReducer
  });
  store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  function* rootSaga() {
    yield all([searchSaga(), userSaga()]);
  }
  sagaMiddleware.run(rootSaga);
});
test('should show inputbox when rendering', () => {
  //given
  //when
  render(
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );

  //then
  const inputbox = screen.getByRole('combobox');
  expect(inputbox).toBeDefined();
});

test('should show changed text when change text', async () => {
  //given
  render(
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );

  //when
  const inputbox = screen.getByRole('combobox');
  fireEvent.change(inputbox, { target: { value: 'user1' } });
  const text = inputbox.getAttribute('value');
  await setTimeout(() => {}, 3000);
  //then
  expect(text).toBe('user1');
});

test('should be called mock function when change text', async () => {
  //given

  render(
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );

  //when
  const inputbox = screen.getByRole('combobox');
  fireEvent.change(inputbox, { target: { value: 'user1' } });
  const text = inputbox.getAttribute('value');
  await setTimeout(() => {}, 3000);
  screen.debug();
});
