import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Settings from './Settings';

test('shoud show Setting button when render Settings Component', () => {
  //given
  // const logout = jest.fn();
  render(<Settings logout={() => {}} />);

  //when
  const settingButton = screen.getByRole('button');

  //then
  expect(settingButton).toBeDefined();
});
test('shoud show 로그아웃, when click Setting button', () => {
  //given
  const logout = jest.fn();
  render(<Settings logout={() => {}} />);

  //when
  const settingButton = screen.getByRole('button');
  fireEvent.click(settingButton);

  //then
  const logoutMenu = screen.getByRole('menuitem');
  expect(logoutMenu).toBeDefined();
});
test('shoud be called logout function, when click 로그아웃', () => {
  //given
  const logout = jest.fn();
  render(<Settings logout={logout} />);
  const settingButton = screen.getByRole('button');
  fireEvent.click(settingButton);

  //when
  const logoutMenu = screen.getByRole('menuitem');
  fireEvent.click(logoutMenu);

  //then
  expect(logout.mock.results.length).toBe(1);
});
