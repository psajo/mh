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
});
