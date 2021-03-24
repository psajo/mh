// import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { callApi } from './api';
import MockAdapter from 'axios-mock-adapter';

beforeEach(() => {
  const mock = new MockAdapter(axios);
  mock.onGet('/user/search').reply(200, {
    data: [],
    resultCode: 0,
    resultMessage: 'test'
  });
});

test('11', async () => {
  const prom = callApi({
    url: '/user/search',
    params: { keyword: 'user1' }
  });
  let count = 0;

  await prom.then(data => {
    return ++count;
  });
  await prom.then(data => {
    return ++count;
  });
  expect(count).toBe(2);
});
