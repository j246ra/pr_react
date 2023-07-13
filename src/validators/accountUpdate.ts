import validator, { INVALID_MESSAGES, Result } from './validator';

export default function accountUpdateValidator(
  email?: string,
  password?: string,
  passwordConfirmation?: string
): Result {
  const { result, addError, emailFormatValidator, passwordLengthValidator } =
    validator();

  if (email) emailFormatValidator(email);

  if (password !== passwordConfirmation)
    addError(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  else if (password) passwordLengthValidator(password);

  return result;
}
