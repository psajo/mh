import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { API_HOST } from '../constant';

export const ResultCode = {
  Success: 0
};

export function callApi({
  method = 'get',
  url,
  params,
  data
}: AxiosRequestConfig): Promise<{
  isSuccess: boolean;
  data: any;
  resultCode: number;
  resultMessage: string;
}> {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true
  }).then(response => {
    const { resultCode, resultMessage } = response.data;
    if (resultCode < 0) {
      message.error(resultMessage);
    }
    message.error(resultMessage);
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage
    };
  });
}
