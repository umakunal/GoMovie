import axios from 'axios';
import APIConstant from '../Constants/APIConstant';

const {ACCESS_TOKEN, APIKEY, BASEURL} = APIConstant;

export const GetApi = async (url: string) => {
  console.log('GetApi: ', `${BASEURL}/${url}`);
  const response: any = await axios.get(`${BASEURL}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return response;
};

export const GetApiWithParam = async (url: string, param: any) => {
  const response: any = await axios.get(
    `${BASEURL}/${url}?api_key=${APIKEY}&${param}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  return response;
};

export const PostApi = async (url: string, body: any) => {
  const response: any = await axios.post(`${BASEURL}/${url}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return response;
};

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
