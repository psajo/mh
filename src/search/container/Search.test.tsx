import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Search from './Search';
// import store from '../../common/store';
import configureStore from 'redux-mock-store';
import { UserAction } from '../../user/state/ducks';
import { SearchAction } from '../state/ducks';

jest.mock('../component/Settings', () => () => <></>);
// jest.mock('./SearchInput', () => () => <></>);

test('shoud match the snapshot when render Search Component', () => {
  //given

  //when
  const createMockStore = configureStore();
  const component = render(
    <Provider
      store={createMockStore({
        search: { keyword: '', autoCompletes: [] }
      })}
    >
      <Search />
    </Provider>
  );

  //then
  expect(component).toMatchSnapshot();
});
