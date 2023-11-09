import { snakeToPascal } from '@lib/stringUtil';

export const applyPrefixedValues = <T extends Record<string, string>>(
  prefix: string,
  object: T
): void => {
  (Object.keys(object) as Array<keyof T>).forEach((key) => {
    object[key] = `${prefix}${snakeToPascal(String(key))}` as T[keyof T];
  });
};

export const LIFELOG_DETAIL_DIALOG_TEST_ID = {
  TBODY: '',
  TD_ACTION: '',
  TD_DETAIL: '',
  TD_STARTED_AT: '',
  TD_FINISHED_AT: '',
  TD_CREATED_AT: '',
  TD_UPDATED_AT: '',
};
applyPrefixedValues('LifelogDetailDialog', LIFELOG_DETAIL_DIALOG_TEST_ID);

export const LIFELOG_EDIT_DIALOG_TEST_ID = {
  BASE: '',
  BUTTON: '',
};
applyPrefixedValues('LifelogEditDialog', LIFELOG_EDIT_DIALOG_TEST_ID);

export const HEADER_TEST_ID = {
  SETTINGS: '',
  EDIT_ACCOUNT: '',
  LOGOUT: '',
  BUTTON: '',
};
applyPrefixedValues('Headers', HEADER_TEST_ID);

export const ACCOUNT_UPDATE_TEST_ID = {
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  PASSWORD_CONFIRM_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues('AccountUpdate', ACCOUNT_UPDATE_TEST_ID);

export const LOGIN_TEST_ID = {
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues('Login', LOGIN_TEST_ID);

export const SIGN_UP_TEST_ID = {
  FORM: '',
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues('SignUp', SIGN_UP_TEST_ID);

export const PASSWORD_FORGET_TEST_ID = {
  EMAIL_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues('PasswordForget', PASSWORD_FORGET_TEST_ID);

export const SESSION_OTHER_LINKS_TEST_ID = {
  PASSWORD_FORGET: '',
  SIGN_UP: '',
};
applyPrefixedValues('SessionOtherLinks', SESSION_OTHER_LINKS_TEST_ID);

export const LIFELOG_LIST_TEST_ID = {
  SPINNER: '',
};
applyPrefixedValues('LifelogList', LIFELOG_LIST_TEST_ID);

export const LIFELOG_LIST_ITEM_TEST_ID = {
  LINK_TEXT: '',
  FINISH_BUTTON: '',
  EDIT_BUTTON: '',
  DELETE_BUTTON: '',
};
applyPrefixedValues('LifelogListItem', LIFELOG_LIST_ITEM_TEST_ID);

export const SEARCH_INPUT_TEST_ID = {
  BASE: '',
  BUTTON: '',
};
applyPrefixedValues('SearchInput', SEARCH_INPUT_TEST_ID);

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
