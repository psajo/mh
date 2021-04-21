import axios from 'axios';
import { callApi } from './api';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios');
const users = [
  {
    name: 'user1',
    tag: '연봉, 교육, 채용, 인테리어, 노트북 관리',
    department: '인사처2'
  }
];
const data = { resultCode: 0, resultMessage: 'testMsg', data: users };
const testResponse = { data, status: 200 };
const userURL = '/user/search';
const keyword = { keyword: 'user1' };

test('should do right call when call the callApi function2', async () => {
  //given
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockResolvedValue(testResponse);
  // const spyFn = jest.spyOn(axios, 'get').mockResolvedValue(testResponse);

  //when
  const res = await callApi({
    url: userURL,
    params: { keyword: 'user1' }
  });

  //then
  expect(res.data[0].name).toBe('user1');
  expect(mockGet).toHaveBeenLastCalledWith(userURL, keyword);
  expect(mockGet).toHaveBeenCalledTimes(1);

  //인자에 맞는 return값이 제대로 나왔는지, axios.get이 url,keyword로 호출됐는지,  1번 호출됐는지
});
