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

const LIFELOG_EDIT_DIALOG_PREFIX = 'LifelogEditDialog';
export const LIFELOG_EDIT_DIALOG_TEST_ID = {
  BASE: g(LIFELOG_EDIT_DIALOG_PREFIX, ''),
  BUTTON: g(LIFELOG_DETAIL_DIALOG_PREFIX, 'Button'),
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

const SIGN_UP_PREFIX = 'SignUp';
export const SIGN_UP_TEST_ID = {
  FORM: g(SIGN_UP_PREFIX, 'Form'),
  EMAIL_INPUT: g(SIGN_UP_PREFIX, 'EmailInput'),
  PASSWORD_INPUT: g(LOGIN_PREFIX, 'PasswordInput'),
  BUTTON: g(LOGIN_PREFIX, 'Button'),
};

const PASSWORD_FORGET_PREFIX = 'PasswordForget';
export const PASSWORD_FORGET_TEST_ID = {
  EMAIL_INPUT: g(PASSWORD_FORGET_PREFIX, 'EmailInput'),
  BUTTON: g(PASSWORD_FORGET_PREFIX, 'Button'),
};

const LIFELOG_LIST_ITEM_PREFIX = 'LifelogListItem';
export const LIFELOG_LIST_ITEM_TEST_ID = {
  LINK_TEXT: g(LIFELOG_LIST_ITEM_PREFIX, 'LinkText'),
  FINISH_BUTTON: g(LIFELOG_LIST_ITEM_PREFIX, 'FinishButton'),
  EDIT_BUTTON: g(LIFELOG_LIST_ITEM_PREFIX, 'EditButton'),
  DELETE_BUTTON: g(LIFELOG_LIST_ITEM_PREFIX, 'DeleteButton'),
};

const SEARCH_INPUT_PREFIX = 'SearchInput';
export const SEARCH_INPUT_TEST_ID = {
  BASE: g(SEARCH_INPUT_PREFIX, ''),
  BUTTON: g(SEARCH_INPUT_PREFIX, 'Button'),
};

export const TEST_IDS = {
  LIFELOG_DETAIL_DIALOG: LIFELOG_DETAIL_DIALOG_TEST_ID,
  LIFELOG_EDIT_DIALOG: LIFELOG_EDIT_DIALOG_TEST_ID,
  HEADER: HEADER_TEST_ID,
  ACCOUNT_UPDATE: ACCOUNT_UPDATE_TEST_ID,
  LOGIN: LOGIN_TEST_ID,
  SIGN_UP: SIGN_UP_TEST_ID,
  PASSWORD_FORGET: PASSWORD_FORGET_TEST_ID,
  LIFELOG_LIST_ITEM: LIFELOG_LIST_ITEM_TEST_ID,
  SEARCH_INPUT: SEARCH_INPUT_TEST_ID,
};

export default TEST_IDS;
