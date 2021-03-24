// import { fireEvent, render, screen } from '@testing-library/react';
import { AxiosRequestConfig } from 'axios';
import { callApi } from './api';

jest.mock('axios', () => (config: AxiosRequestConfig) =>
  new Promise(resolve => {
    console.log('hi');
    resolve({ isSuccess: true, data: [], resultCode: 0, resultMessage: '' });
  })
);
test('', () => {
  callApi({}).then(data => {
    console.log(data);
  });
});
