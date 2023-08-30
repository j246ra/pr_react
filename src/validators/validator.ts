import notify from '@lib/toast';
import { VALIDATOR } from '@lib/consts/common';

export type Result = {
  isInvalid: boolean;
  message: string[];
};

export const INVALID_MESSAGES = {
  ...VALIDATOR.MESSAGE,
  TEXT_PRESENCE: (name: string) => `${name}${VALIDATOR.MESSAGE.TEXT_PRESENCE}`,
};

export default function validator() {
  const emailRegex = VALIDATOR.EMAIL_REGEX;

  const result: Result = {
    isInvalid: false,
    message: [],
  };

  const addError = (message: string) => {
    notify.error(message);
    result.isInvalid = true;
    result.message.push(message);
  };

  const textPresenceValidator = (value: string | undefined, name: string) => {
    if (value === undefined || value === '')
      addError(INVALID_MESSAGES.TEXT_PRESENCE(name));
  };

  const emailFormatValidator = (email: string) => {
    if (!email.match(emailRegex)) addError(INVALID_MESSAGES.EMAIL_FORMAT);
  };

  const passwordLengthValidator = (password: string) => {
    if (password.length < 6 || password.length > 128)
      addError(INVALID_MESSAGES.PASSWORD_LENGTH);
  };

  return {
    emailRegex,
    result,
    addError,
    textPresenceValidator,
    emailFormatValidator,
    passwordLengthValidator,
  };
}
