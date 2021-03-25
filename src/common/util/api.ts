import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { API_HOST } from '../constant';

export const ResultCode = {
  Success: 0
};
const axiosInstance = axios.create({ baseURL: API_HOST });

export function callApi({
  url = '',
  params
}: AxiosRequestConfig): Promise<{
  isSuccess: boolean;
  data: string;
  resultCode: number;
  resultMessage: string;
}> {
  return axiosInstance.get(url, { params }).then(response => {
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
