export const COMMON = {
  MESSAGE: {
    ERROR: {
      GENERAL: '想定外のエラーが発生しました',
    } as const,
  } as const,
  REQUIRED: '(必須)',
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

export const EMAIL_INPUT = {
  LABEL: 'メールアドレス',
  PLACEHOLDER: 'メールアドレスを入力',
  REQUIRED: COMMON.REQUIRED,
};

export const PASSWORD_FORGET = {
  GUIDANCE: 'パスワードを忘れた方',
  MESSAGE: {
    INFO: 'パスワードリセットメールの送信先を入力してください。',
    SUCCESS: 'パスワードリセットメールを送信しました。',
    ERROR: '送信に失敗しました。',
  } as const,
  EMAIL_INPUT: {
    PLACEHOLDER: '送信先のメールドレスを入力',
  } as const,
  BUTTON: {
    SUBMIT: '送信',
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
    PASSWORD_FORGET: PASSWORD_FORGET.GUIDANCE,
    SIGN_UP: '新規登録',
  } as const,
};

export const PASSWORD_INPUT = {
  LABEL: 'パスワード',
  PLACEHOLDER: 'パスワードを入力',
  REQUIRED: COMMON.REQUIRED,
};

export const PASSWORD_EDIT = {
  MESSAGE: {
    SUCCESS: 'パスワードリセットが成功しました。',
    ERROR: 'パスワードリセットに失敗しました。',
  } as const,
  PASSWORD_INPUT: {
    PLACEHOLDER: '新しいパスワードを入力',
  } as const,
  PASSWORD_CONFIRM: {
    LABEL: 'パスワード（確認用）',
    PLACEHOLDER: '新しいパスワードを入力（確認用）',
  } as const,
  BUTTON: {
    SUBMIT: 'パスワード変更',
  } as const,
};

export const RESET_MAIL_SUCCESS = {
  INFO: '送信に成功しました。メールをご確認ください。',
};

export const SIGN_UP = {
  MESSAGE: {
    SUCCESS: 'アカウント作成に成功しました',
  } as const,
  BUTTON: {
    SUBMIT: '登録',
  } as const,
  LINK: {
    PASSWORD_FORGET: PASSWORD_FORGET.GUIDANCE,
  },
};

export const HEADER = {
  MENU: {
    TOP: '設定',
    CREATE_LOG: '新規作成',
    SEARCH: '詳細検索',
    EDIT_ACCOUNT: 'アカウント編集',
    LOG_OUT: 'ログアウト',
  },
};

export const COMPONENT = {
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  LOGIN,
  PASSWORD_INPUT,
  PASSWORD_EDIT,
  PASSWORD_FORGET,
  RESET_MAIL_SUCCESS,
  SIGN_UP,
  EMAIL_INPUT,
  HEADER,
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
