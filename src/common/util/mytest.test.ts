import { fireEvent, render, screen } from '@testing-library/react';
let sum = 0;

beforeEach(() => {
  sum = 0;
});

afterEach(() => {
  console.log(sum);
});

test('value of sum is 10', () => {
  //when
  sum = sum + 10;

  //then
  expect(sum).toBe(10);
});
test('value of sum is 10', () => {
  //when
  sum = sum + 10;

  //then
  expect(sum).toBe(10);
});
