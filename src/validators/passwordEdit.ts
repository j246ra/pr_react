import validator, { INVALID_MESSAGES, Result } from './validator';

type PasswordEditValidator = (password: string, passwordConfirmation: string) => Result;

const passwordEditValidator: PasswordEditValidator = (password, passwordConfirmation) => {
  const { result, addError, passwordLengthValidator } = validator();
  if (password !== undefined && password !== '')
    passwordLengthValidator(password);
  if (password !== passwordConfirmation)
    addError(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  return result;
};

export default passwordEditValidator;
