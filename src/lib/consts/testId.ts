const g = (prefix: string, value: string) => prefix + value;

const LIFELOG_DETAIL_DIALOG_PREFIX = 'LifelogDetailDialog';
export const LIFELOG_DETAIL_DIALOG_TEST_ID = {
  TBODY: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'Tbody'),
  TD_ACTION: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdAction'),
  TD_DETAIL: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdDetail'),
  TD_STARTED_AT: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdStartedAt'),
  TD_FINISHED_AT: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdFinishedAt'),
  TD_CREATED_AT: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdCreatedAt'),
  TD_UPDATED_AT: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'TdUpdatedAt'),
};

const HEADER_PREFIX = 'Headers';

export const HEADER_TEST_ID = {
  SETTINGS: g(HEADER_PREFIX, 'Settings'),
  EDIT_ACCOUNT: g(HEADER_PREFIX, 'EditAccount'),
  LOGOUT: g(HEADER_PREFIX, 'Logout'),
  BUTTON: g(HEADER_PREFIX, 'Button'),
};

const ACCOUNT_UPDATE_PREFIX = 'AccountUpdate';
export const ACCOUNT_UPDATE_TEST_ID = {
  EMAIL_INPUT: g(ACCOUNT_UPDATE_PREFIX, 'EmailInput'),
  PASSWORD_INPUT: g(ACCOUNT_UPDATE_PREFIX, 'PasswordInput'),
  PASSWORD_CONFIRM_INPUT: g(ACCOUNT_UPDATE_PREFIX, 'PasswordConfirmInput'),
  BUTTON: g(ACCOUNT_UPDATE_PREFIX, 'Button'),
};

const LOGIN_PREFIX = 'Login';
export const LOGIN_TEST_ID = {
  EMAIL_INPUT: g(LOGIN_PREFIX, 'EmailInput'),
  PASSWORD_INPUT: g(LOGIN_PREFIX, 'PasswordInput'),
  BUTTON: g(LOGIN_PREFIX, 'Button'),
};

export const TEST_IDS = {
  LIFELOG_DETAIL_DIALOG: LIFELOG_DETAIL_DIALOG_TEST_ID,
  HEADER: HEADER_TEST_ID,
  ACCOUNT_UPDATE: ACCOUNT_UPDATE_TEST_ID,
  LOGIN: LOGIN_TEST_ID,
};

export default TEST_IDS;
