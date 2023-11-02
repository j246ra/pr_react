import applyCaseMiddleware from 'axios-case-converter';
import axios, { AxiosInstance } from 'axios';
import { API } from '@lib/consts/common';

type Options = {
  ignoreHeaders: boolean;
};

const options: Options = {
  ignoreHeaders: true,
};

export const baseUrl = `${API.SCHEME}://${API.HOST}`;

const client: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: `${baseUrl}/${API.VERSION}`,
  }),
  options
);

export default client;
