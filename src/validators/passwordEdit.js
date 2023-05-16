import validator from './validator';

export default function passwordEditValidator(password, passwordConfirmation) {
  const { result, addError, passwordLengthValidator } = validator();
  if (password !== undefined && password !== '')
    passwordLengthValidator(password);
  if (password !== passwordConfirmation)
    addError('入力したパスワードが一致しません。');
  return result;
}
