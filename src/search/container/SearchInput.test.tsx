import { render } from '@testing-library/react';
import React from 'react';
import Search from './Search';

jest.mock('../component/Settings', () => () => <></>);
jest.mock('./SearchInput', () => () => <></>);
test('shoud match the snapshot when render Search Component', () => {
  //given

  //when
  const component = render(<Search />);
  //then
  expect(component).toMatchSnapshot();
});
