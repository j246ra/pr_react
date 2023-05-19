import validator, { Result } from './validator';

type SignUpValidator = (email: string, password: string) => Result;

const signUpValidator: SignUpValidator = (email, password) => {
  const {
    result,
    textPresenceValidator,
    emailFormatValidator,
    passwordLengthValidator,
  } = validator();
  textPresenceValidator(email, 'メールアドレス');
  emailFormatValidator(email);
  passwordLengthValidator(password);
  return result;
};

export default signUpValidator;
