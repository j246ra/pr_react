import validator, { INVALID_MESSAGES, Result } from './validator';

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

  textPresenceValidator(password, 'パスワード');
  textPresenceValidator(passwordConfirmation, 'パスワード（確認用）');

  if (!result.isInvalid) {
    if (password !== passwordConfirmation)
      addError(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  }

  if (!result.isInvalid) passwordLengthValidator(password);

  return result;
};

export default passwordEditValidator;
