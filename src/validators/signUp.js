import validator from "./validator";

export default function signUpValidator(email, password) {
  const {result, textPresenceValidator,emailFormatValidator, passwordLengthValidator} = validator();
  textPresenceValidator(email, 'メールアドレス');
  emailFormatValidator(email);
  passwordLengthValidator(password);
  return result;
}
