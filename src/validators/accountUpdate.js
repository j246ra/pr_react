import validator from "./validator";

export default function accountUpdateValidator(email, password) {
  const { result, emailFormatValidator, passwordLengthValidator} = validator();
  if(email !== undefined && email !== "") emailFormatValidator(email);
  if(password !== undefined && password !== "") passwordLengthValidator(password);
  return result;
}
