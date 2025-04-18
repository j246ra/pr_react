import CONST from '@lib/consts/common';

export const AUTHENTICATED_ONLY = {
  MESSAGE: {
    ERROR: 'ログインしてください。',
  } as const,
  FALLBACK_PATH: CONST.ROUTES.LOGIN,
};

export const UNAUTHENTICATED_ONLY = {
  FALLBACK_PATH: CONST.ROUTES.LIFELOGS,
};

export const EMAIL_INPUT = {
  LABEL: 'メールアドレス',
  PLACEHOLDER: 'メールアドレスを入力',
  REQUIRED: CONST.COMMON.REQUIRED,
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
    ERROR: 'アカウントの削除に失敗しました。',
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
    SUCCESS: 'アカウントを更新しました。',
    ERROR: 'アカウントの更新に失敗しました。',
  } as const,
  PASSWORD_CONFIRM: {
    ID: 'password-confirm-input',
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
      NEED_LOGIN: 'IDとパスワードを入力してログインしてください。',
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

export const LOGOUT = {
  MESSAGE: {
    SUCCESS: 'ログアウトしました。',
    ERROR:
      'ログアウトに失敗しました。しばらくしてから再度ログアウトしてください。',
  },
};

export const PASSWORD_INPUT = {
  LABEL: 'パスワード',
  PLACEHOLDER: 'パスワードを入力',
  REQUIRED: CONST.COMMON.REQUIRED,
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
  INFO: 'メールを送信しました。メールをご確認ください。',
};

export const SIGN_UP = {
  MESSAGE: {
    SUCCESS: 'アカウント作成に成功しました',
    ERROR: 'アカウント作成に失敗しました。',
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

export const LIFELOGS = {
  MESSAGE: {
    SUCCESS: '行動を記録しました。',
  },
};

export const CONTEXT_INPUT = {
  PLACEHOLDER: '行動を入力(空白以降は詳細として記録されます)',
  MESSAGE: {
    ERROR: 'データの更新に失敗しました。',
  },
};

export const DATETIME_INPUT = {
  MONTHS: [
    '１月',
    '２月',
    '３月',
    '４月',
    '５月',
    '６月',
    '７月',
    '８月',
    '９月',
    '１０月',
    '１１月',
    '１２月',
  ],
  WEEKDAYS_LONG: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  WEEKDAYS_SHORT: ['日', '月', '火', '水', '木', '金', '土'],
  LOCALE: 'ja',
};

export const LIFELOG_LIST_HEADER = {
  STARTED_AT: '開始時間',
  ACTION: '行動内容',
  DETAIL: '詳細',
  OPERATION: '操作',
};

export const LIFELOG_LIST = {
  MESSAGE: {
    ERROR: 'データ取得に失敗しました。',
    INVALID_DATA: '一部、データ取得に失敗しました。',
    NO_DATA:
      'ライフログが１件も記録されていませんね。\nどんどん行動を記録していきましょう！！',
  },
};

export const SEARCH_INPUT = {
  PLACEHOLDER: '検索（行動、詳細）',
};

export const LIFELOG_DETAIL_DIALOG = {
  LABEL: {
    ACTION: '行動',
    DETAIL: '詳細',
    STARTED_AT: '開始時間',
    FINISHED_AT: '終了時間',
    CREATED_AT: '作成日時',
    UPDATED_AT: '更新日時',
  } as const,
};

export const LIFELOG_EDIT_DIALOG = {
  MESSAGE: {
    SUCCESS: '行動を保存しました。',
    ERROR: 'ダータの更新に失敗しました。',
  } as const,
  ACTION: {
    LABEL: '行動内容',
    PLACEHOLDER: '行動内容を入力してください。',
  } as const,
  DETAIL: {
    LABEL: '詳細',
    PLACEHOLDER: '詳細を入力してください。',
  } as const,
  STARTED_AT: {
    LABEL: '開始日時',
    PLACEHOLDER: '開始日時',
  } as const,
  FINISHED_AT: {
    LABEL: '終了日時',
    PLACEHOLDER: '終了日時',
  } as const,
  BUTTONS: {
    SAVE: '保存',
    FINISH: '完了時間を設定',
    DELETE: '削除',
  },
};

export const NOTFOUND = {
  CONTEXT: 'お探しのページは見つかりません。',
};

export const COMPONENT = {
  CERTIFIED: AUTHENTICATED_ONLY,
  UNAUTHENTICATED_ONLY,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  LOGIN,
  LOGOUT,
  PASSWORD_INPUT,
  PASSWORD_EDIT,
  PASSWORD_FORGET,
  RESET_MAIL_SUCCESS,
  SIGN_UP,
  EMAIL_INPUT,
  HEADER,
  LIFELOGS,
  CONTEXT_INPUT,
  DATETIME_INPUT,
  LIFELOG_LIST_HEADER,
  LIFELOG_LIST,
  SEARCH_INPUT,
  LIFELOG_DETAIL_DIALOG,
  LIFELOG_EDIT_DIALOG,
  NOTFOUND,
};

export default COMPONENT;
