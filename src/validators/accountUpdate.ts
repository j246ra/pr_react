import validator, { INVALID_MESSAGES, Result } from './validator';

export type accountUpdateParams = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export default function accountUpdateValidator(
  params: accountUpdateParams
): Result {
  const { result, addError, emailFormatValidator, passwordLengthValidator } =
    validator();
  const { email, password, passwordConfirmation } = params;
  if (email) emailFormatValidator(email);

  if (password !== passwordConfirmation)
    addError(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  else if (password) passwordLengthValidator(password);

  return result;
}
