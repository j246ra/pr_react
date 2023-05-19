import validator, { Result } from './validator';

export default function accountUpdateValidator(
  email: string,
  password: string
): Result {
  const { result, emailFormatValidator, passwordLengthValidator } = validator();
  if (email !== undefined && email !== '') emailFormatValidator(email);
  if (password !== undefined && password !== '')
    passwordLengthValidator(password);
  return result;
}
