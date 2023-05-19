import applyCaseMiddleware from 'axios-case-converter';
import axios, { AxiosInstance } from 'axios';

interface Options {
  ignoreHeaders: boolean;
}

const options: Options = {
  ignoreHeaders: true,
};

const client: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000/v1',
  }),
  options
);

export default client;
