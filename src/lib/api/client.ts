import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import { API } from '@lib/consts/common';

export type Headers = {
  'access-token'?: string;
  uid?: string;
  client?: string;
  'session-id'?: string;
};

type Options = {
  ignoreHeaders: boolean;
};

const options: Options = {
  ignoreHeaders: true,
};

export const baseUrl = `${API.SCHEME}://${API.HOST}`;

export const createClient = () => {
  return applyCaseMiddleware(
    axios.create({
      baseURL: `${baseUrl}/${API.VERSION}`,
      withCredentials: true,
    }),
    options
  );
};

export default createClient;
