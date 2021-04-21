import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { API_HOST } from '../constant';

export const ResultCode = {
  Success: 0
};
interface ApiResult {
  isSuccess: boolean;
  data: UserData[];
  resultCode: number;
  resultMessage: string;
}
axios.defaults.baseURL = 'localhost:3001';
export function callApi({
  url = '',
  params
}: AxiosRequestConfig): Promise<ApiResult> {
  return axios.get(url, params).then(response => {
    const { resultCode, resultMessage } = response.data;
    if (resultCode < 0) {
      message.error(resultMessage);
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage
    };
  });
}
export function callApi2({
  method = 'get',
  url,
  params,
  data
}: AxiosRequestConfig): Promise<{
  isSuccess: boolean;
  data: UserData[];
  resultCode: number;
  resultMessage: string;
}> {
  return axios({
    url,
    method,
    data,
    baseURL: API_HOST,
    params,
    withCredentials: true
  }).then(response => {
    const { resultCode, resultMessage } = response.data;
    if (resultCode < 0) {
      message.error(resultMessage);
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage
    };
  });
}
