const prefixedValueFunction = (prefix: string) => (value: string) =>
  prefix + value;

let value = prefixedValueFunction('LifelogDetailDialog');
export const LIFELOG_DETAIL_DIALOG_TEST_ID = {
  TBODY: value('Tbody'),
  TD_ACTION: value('TdAction'),
  TD_DETAIL: value('TdDetail'),
  TD_STARTED_AT: value('TdStartedAt'),
  TD_FINISHED_AT: value('TdFinishedAt'),
  TD_CREATED_AT: value('TdCreatedAt'),
  TD_UPDATED_AT: value('TdUpdatedAt'),
};

value = prefixedValueFunction('LifelogEditDialog');
export const LIFELOG_EDIT_DIALOG_TEST_ID = {
  BASE: value(''),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('Headers');
export const HEADER_TEST_ID = {
  SETTINGS: value('Settings'),
  EDIT_ACCOUNT: value('EditAccount'),
  LOGOUT: value('Logout'),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('AccountUpdate');
export const ACCOUNT_UPDATE_TEST_ID = {
  EMAIL_INPUT: value('EmailInput'),
  PASSWORD_INPUT: value('PasswordInput'),
  PASSWORD_CONFIRM_INPUT: value('PasswordConfirmInput'),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('Login');
export const LOGIN_TEST_ID = {
  EMAIL_INPUT: value('EmailInput'),
  PASSWORD_INPUT: value('PasswordInput'),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('SignUp');
export const SIGN_UP_TEST_ID = {
  FORM: value('Form'),
  EMAIL_INPUT: value('EmailInput'),
  PASSWORD_INPUT: value('PasswordInput'),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('PasswordForget');
export const PASSWORD_FORGET_TEST_ID = {
  EMAIL_INPUT: value('EmailInput'),
  BUTTON: value('Button'),
};

value = prefixedValueFunction('SessionOtherLinks');
export const SESSION_OTHER_LINKS_TEST_ID = {
  PASSWORD_FORGET: value('PasswordForget'),
  SIGN_UP: value('SingUp'),
};

value = prefixedValueFunction('LifelogList');
export const LIFELOG_LIST_TEST_ID = {
  SPINNER: value('Spinner'),
};

value = prefixedValueFunction('LifelogListItem');
export const LIFELOG_LIST_ITEM_TEST_ID = {
  LINK_TEXT: value('LinkText'),
  FINISH_BUTTON: value('FinishButton'),
  EDIT_BUTTON: value('EditButton'),
  DELETE_BUTTON: value('DeleteButton'),
};

value = prefixedValueFunction('SearchInput');
export const SEARCH_INPUT_TEST_ID = {
  BASE: value(''),
  BUTTON: value('Button'),
};

export const TEST_IDS = {
  LIFELOG_DETAIL_DIALOG: LIFELOG_DETAIL_DIALOG_TEST_ID,
  LIFELOG_EDIT_DIALOG: LIFELOG_EDIT_DIALOG_TEST_ID,
  HEADER: HEADER_TEST_ID,
  ACCOUNT_UPDATE: ACCOUNT_UPDATE_TEST_ID,
  LOGIN: LOGIN_TEST_ID,
  SIGN_UP: SIGN_UP_TEST_ID,
  PASSWORD_FORGET: PASSWORD_FORGET_TEST_ID,
  SESSION_OTHER_LINKS: SESSION_OTHER_LINKS_TEST_ID,
  LIFELOG_LIST: LIFELOG_LIST_TEST_ID,
  LIFELOG_LIST_ITEM: LIFELOG_LIST_ITEM_TEST_ID,
  SEARCH_INPUT: SEARCH_INPUT_TEST_ID,
};

export default TEST_IDS;
