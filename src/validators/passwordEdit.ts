import validator, { Result } from './validator';

type PasswordEditValidator = (password: string, passwordConfirmation: string) => Result;

const passwordEditValidator: PasswordEditValidator = (password, passwordConfirmation) => {
  const { result, addError, passwordLengthValidator } = validator();
  if (password !== undefined && password !== '')
    passwordLengthValidator(password);
  if (password !== passwordConfirmation)
    addError('入力したパスワードが一致しません。');
  return result;
};

export default passwordEditValidator;
