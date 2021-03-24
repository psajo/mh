import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
// import store from '../../common/store';
import { combineReducers, createStore } from 'redux';
import mySearchReducer from '../state/ducks';
// import configureStore from 'redux-mock-store';
import Search from './Search';

jest.mock('../component/Settings', () => () => <></>);
// jest.mock('./SearchInput', () => () => <></>);

let store: any;

beforeEach(() => {
  const reducer = combineReducers({
    search: mySearchReducer
  });
  store = createStore(reducer);
});

test('shoud match the snapshot when render Search Component', () => {
  //given
  //when
  const container = render(
    <Provider store={store}>
      <Search />
    </Provider>
  );

  //then
  expect(container).toMatchSnapshot();
});
