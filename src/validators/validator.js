import AppToaster from ".././lib/toaster";
const toaster = AppToaster();

export default function validator() {
  const emailRegex = /^[\w+\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]+$/

  const result = {
    isInvalid: false,
    message: [],
  }

  const addError = (message) => {
    toaster.show({icon: 'error', intent: 'danger', message});
    result.isInvalid = true;
    result.message.push(message);
  };

  const textPresenceValidator = (value, name) => {
    if(value === undefined || value === "") addError(`${name}を入力してください`);
  };

  const emailFormatValidator = (email) => {
    if(!email.match(emailRegex))
      addError("メールアドレスのフォーマットエラー");
  };

  const passwordLengthValidator = (password) => {
    if(password.length < 6 || password.length > 128 )
      addError("パスワードは６文字以上１２８文字以下にしてください。");
  };

  return {emailRegex, result, addError, textPresenceValidator, emailFormatValidator, passwordLengthValidator};
}
