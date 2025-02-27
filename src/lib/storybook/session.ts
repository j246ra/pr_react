import { API } from '@lib/consts/common';
import { http, HttpResponse } from 'msw';
import { apiHost } from '@lib/storybook/util';

const ENDPOINT = API.SESSION.ENDPOINT;

export const signInHandler = () => {
  return http.post(apiHost('/auth/sign_in'), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const signUpHandler = () => {
  return http.post(apiHost(ENDPOINT.USER), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const updateUserHandler = () => {
  return http.put(apiHost(ENDPOINT.USER), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const signOutHandler = () => {
  return http.delete(apiHost(ENDPOINT.SIGN_OUT), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const deleteUserHandler = () => {
  return http.delete(apiHost(ENDPOINT.USER), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const passwordResetHandler = () => {
  return http.put(apiHost(ENDPOINT.PASSWORD_RESET), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};

export const passwordForgetHandler = () => {
  return http.post(apiHost(ENDPOINT.PASSWORD_RESET), ({}) => {
    return new HttpResponse(null, { status: 200 });
  });
};
