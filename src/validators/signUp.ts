import validator, { Result } from './validator';
import { EMAIL_INPUT } from '@lib/consts/component';

type SignUpValidator = (email: string, password: string) => Result;

const signUpValidator: SignUpValidator = (email, password) => {
  const {
    result,
    textPresenceValidator,
    emailFormatValidator,
    passwordLengthValidator,
  } = validator();
  textPresenceValidator(email, EMAIL_INPUT.PLACEHOLDER);
  if (!result.isInvalid) emailFormatValidator(email);
  passwordLengthValidator(password);
  return result;
};

export default signUpValidator;
