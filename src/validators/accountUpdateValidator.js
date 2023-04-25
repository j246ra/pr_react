import AppToaster from ".././lib/toaster";
const toaster = AppToaster();


export default function accountUpdateValidator(email, password) {
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

  if(email !== undefined && email !== "") {
    if(!email.match(emailRegex)) addError("メールアドレスのフォーマットエラー");
  }

  if(password !== undefined && password !== ""){
    if(password.length < 6 || password.length > 128 ) addError("パスワードは６文字以上１２８文字以下にしてください。");
  }

  return result;
}
