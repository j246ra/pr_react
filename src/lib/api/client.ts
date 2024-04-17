import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import { API } from '@lib/consts/common';

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
    }),
    options
  );
};

export default createClient;
