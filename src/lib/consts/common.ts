import env from '@lib/appEnv';

export const ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/sign_up',
  ACCOUNT_UPDATE: '/update_account',
  PASSWORD_FORGET: '/password_forget',
  RESET_MAIL_SEND_SUCCESS: '/send_success',
  PASSWORD_EDIT: '/password_edit',
  LIFELOGS: '/lifelogs',
};

export const COMMON = {
  APP_URL: {
    HOST_URL: env('host_url', 'http://localhost:3001'),
    BASE_DIR: '/app',
  },
  SENTRY: {
    DSN: env('sentry_dsn'),
  },
  MESSAGE: {
    ERROR: {
      GENERAL: '想定外のエラーが発生しました',
      EXPIRED: '認証期限切れの為、再度ログインしてください。',
      STATUS_5XX: 'サーバーエラーの為、一時的に情報が取得できません。',
    } as const,
  } as const,
  REQUIRED: '(必須)',
};

export const API = {
  SCHEME: env('api_scheme', 'http'),
  HOST: env('api_host', 'localhost:3000'),
  VERSION: env('api_version', 'v1'),
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
  MESSAGE: {
    ERROR: {
      INVALID_TOKEN: 'Invalid Token',
    },
  },
};

export const DATE_UTIL = {
  FORMAT: {
    DATETIME_FULL: 'YYYY-MM-DD HH:mm:ss.SSS',
    DISPLAY_TIME: 'HH:mm',
    DISPLAY_TIME_FULL: 'HH:mm',
    DISPLAY_DATE: 'YY/MM/DD',
    DISPLAY_DATE_FULL: 'YYYY/MM/DD',
    DISPLAY_DATETIME: 'YY/MM/DD HH:mm',
    DISPLAY_DATETIME_FULL: 'YYYY/MM/DD HH:mm:ss',
  } as const,
  MAX_ACTION_MINUTES: 999,
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
    ERROR: '削除に失敗しました。',
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

export const LIFELOG_API_MOCKS = {
  PARAMS: {
    WORD: {
      NO_DATA: 'empty',
    },
  },
};

export const CONST = {
  COMMON,
  ROUTES,
  API,
  DATE_UTIL,
  NOTIFY,
  USE_DELETE_LIFELOG,
  USE_FINISH_ACTION,
  VALIDATOR,
  LIFELOG_API_MOCKS,
};

export default CONST;
