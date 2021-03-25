<<<<<<< HEAD
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { url } from 'node:inspector';
import { callApi } from './api';

// () => () =>
//   new Promise(resolve => {
//     resolve({ data: { resultCode: 0, resultMessage: 'testMsg' } });
//   })
jest.mock('axios');
const data = [{ name: 'park', tag: 'study', department: 'dst' }];
test('test', async () => {
  //given
  const spyFn = jest.spyOn(axios, 'get');
  spyFn.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ data: { resultCode: 0, resultMessage: 'testMsg' } });
      })
  );
  //when
  const result = await callApi({
    url: '/user/search',
    params: { keyword: 'test' }
  });
  //then
  expect(data[0].name).toBe('park');

  //인자에 맞는 return값이 제대로 나왔는지, axios.get이 url,keyword로 호출됐는지,  1번 호출됐는지
=======
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
>>>>>>> d2bb2c78b4e5f0447e3786a0d42599cbe6b4c039
});
