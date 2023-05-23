import validator, { Result } from './validator';

export default function accountUpdateValidator(
  email?: string,
  password?: string,
  passwordConfirmation?: string
): Result {
  const { result, addError, emailFormatValidator, passwordLengthValidator } =
    validator();
  if (email) emailFormatValidator(email);
  if (password) passwordLengthValidator(password);
  if (passwordConfirmation) passwordLengthValidator(passwordConfirmation);
  if ((password || passwordConfirmation) && password !== passwordConfirmation)
    addError('入力したパスワードが一致しません。');
  return result;
}
