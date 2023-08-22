export const COMMON = {
  MESSAGE: {
    ERROR: {
      GENERAL: '想定外のエラーが発生しました',
    } as const,
  } as const,
};

export const API = {
  SCHEME: 'http',
  HOST: 'localhost:3000',
  VERSION: 'v1',
  SESSION: {
    ENDPOINT: {
      USER: '/auth',
      SIGN_IN: '/auth/sign_in',
      SIGN_OUT: '/auth/sign_out',
      VALIDATE: '/auth/validate_token',
      PASSWORD_RESET: '/auth/password',
    },
  } as const,
  LIFELOG: {
    ENDPOINT: '/lifelogs',
  } as const,
};

export const DATE_UTIL = {
  FORMAT: {
    DATETIME_FULL: 'YYYY-MM-DD HH:mm:ss.SSS',
    DISPLAY_DATETIME_FULL: 'YYYY-MM-DD HH:mm:ss',
  } as const,
};

export const NOTIFY = {
  STYLE: {
    ERROR: { style: { color: 'red' } },
  } as const,
};

export const USE_DELETE_LIFELOG = {
  MESSAGE: {
    CONFIRM: '本当に削除しますか？',
    SUCCESS: '削除成功',
  } as const,
};

export const USE_FINISH_ACTION = {
  MESSAGE: {
    SUCCESS: '行動時間を記録しました。',
  } as const,
};

export const VALIDATOR = {
  EMAIL_REGEX: /^[\w+\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]+$/,
  MESSAGE: {
    TEXT_PRESENCE: `を入力してください`,
    EMAIL_FORMAT: 'メールアドレスのフォーマットエラー',
    PASSWORD_LENGTH: 'パスワードは６文字以上１２８文字以下にしてください。',
    PASSWORD_NO_MATCH: '入力したパスワードが一致しません。',
  } as const,
};

export const ACCOUNT_DELETE = {
  MESSAGE: {
    SUCCESS: 'アカウントを削除しました。',
  } as const,
  BUTTON: {
    DELETE: 'アカウント削除',
  } as const,
  ALERT: {
    CONFIRM: '削除',
    CANCEL: 'キャンセル',
    MESSAGE: '本当にアカウントを削除しますか？',
  } as const,
};

export const ACCOUNT_UPDATE = {
  MESSAGE: {
    ERROR: 'アカウントの更新に失敗しました。',
  } as const,
  PASSWORD_CONFIRM: {
    LABEL: 'パスワード（確認用）',
    PLACEHOLDER: '新しいパスワードを入力',
  },
  BUTTON: {
    SUBMIT: '更新',
  } as const,
};

export const LOGIN = {
  MESSAGE: {
    SUCCESS: 'ログイン成功',
    ERROR: {
      STATUS_401: '認証に失敗しました。IDとパスワードをご確認ください。',
      NORMAL: '認証に失敗しました。',
    } as const,
  } as const,
  BUTTON: {
    SUBMIT: 'ログイン',
  } as const,
  LINK: {
    PASSWORD_FORGET: 'パスワードを忘れた方',
    SIGN_UP: '新規登録',
  } as const,
};

export const COMPONENT = {
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  LOGIN,
};

const CONST = {
  COMMON,
  API,
  DATE_UTIL,
  NOTIFY,
  USE_DELETE_LIFELOG,
  USE_FINISH_ACTION,
  VALIDATOR,
  COMPONENT,
};

export default CONST;
