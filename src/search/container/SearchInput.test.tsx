import { all } from '@redux-saga/core/effects';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import searchSaga from '../../search/state/saga';
import myUserReducer from '../../user/state/ducks';
import userSaga from '../../user/state/saga';
import mySearchReducer from '../state/ducks';
import SearchInput from './SearchInput';

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
