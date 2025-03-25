import { API } from '@lib/consts/common';

export class InvalidTokenError extends Error {
  name = 'InvalidTokenError';

  constructor(message = API.MESSAGE.ERROR.INVALID_TOKEN) {
    super(message);
  }
}
