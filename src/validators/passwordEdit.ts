import validator, { INVALID_MESSAGES, Result } from './validator';
import { PASSWORD_EDIT, PASSWORD_INPUT } from '@lib/consts/component';

type PasswordEditValidator = (
  password: string,
  passwordConfirmation: string
) => Result;

const passwordEditValidator: PasswordEditValidator = (
  password,
  passwordConfirmation
) => {
  const { result, addError, textPresenceValidator, passwordLengthValidator } =
    validator();

  textPresenceValidator(password, PASSWORD_INPUT.LABEL);
  textPresenceValidator(
    passwordConfirmation,
    PASSWORD_EDIT.PASSWORD_CONFIRM.LABEL
  );

  if (!result.isInvalid) {
    if (password !== passwordConfirmation)
      addError(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  }

  if (!result.isInvalid) passwordLengthValidator(password);

  return result;
};

export default passwordEditValidator;
