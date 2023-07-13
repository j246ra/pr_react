import notify from '@lib/toast';

export interface Result {
  isInvalid: boolean;
  message: string[];
}

export const INVALID_MESSAGES = {
  TEXT_PRESENCE: (name: string) => `${name}を入力してください`,
  EMAIL_FORMAT: 'メールアドレスのフォーマットエラー',
  PASSWORD_LENGTH: 'パスワードは６文字以上１２８文字以下にしてください。',
  PASSWORD_NO_MATCH: '入力したパスワードが一致しません。',
};

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
      addError(INVALID_MESSAGES.TEXT_PRESENCE(name));
  };

  const emailFormatValidator = (email: string) => {
    if (!email.match(emailRegex)) addError(INVALID_MESSAGES.EMAIL_FORMAT);
  };

  const passwordLengthValidator = (password: string) => {
    if (password.length < 6 || password.length > 128)
      addError(INVALID_MESSAGES.PASSWORD_LENGTH);
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
