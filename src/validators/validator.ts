import notify from '@lib/toast';

export interface Result {
  isInvalid: boolean;
  message: string[];
}

export default function validator() {
  const emailRegex = /^[\w+\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]+$/;

  const result: Result = {
    isInvalid: false,
    message: [],
  };

  const addError = (message: string) => {
    notify.error(message);
    result.isInvalid = true;
    result.message.push(message);
  };

  const textPresenceValidator = (value: string | undefined, name: string) => {
    if (value === undefined || value === '')
      addError(`${name}を入力してください`);
  };

  const emailFormatValidator = (email: string) => {
    if (!email.match(emailRegex))
      addError('メールアドレスのフォーマットエラー');
  };

  const passwordLengthValidator = (password: string) => {
    if (password.length < 6 || password.length > 128)
      addError('パスワードは６文字以上１２８文字以下にしてください。');
  };

  return {
    emailRegex,
    result,
    addError,
    textPresenceValidator,
    emailFormatValidator,
    passwordLengthValidator,
  };
}
