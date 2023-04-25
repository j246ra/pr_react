import validator from "./validator";

export default function accountUpdateValidator(email, password) {
  const { result, emailValidator, passwordValidator} = validator();
  if(email !== undefined && email !== "") emailValidator(email);
  if(password !== undefined && password !== "") passwordValidator(password);
  return result;
}
