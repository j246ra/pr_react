/**
 * 📌 このファイルの目的
 * コンポーネントテスト用のdata-testidを集中的に管理します。
 * テストIDは自動生成され、一定のルールに基づいています。
 *
 * 🚩 ルール
 * - オブジェクトのキー名は必ず大文字のスネークケースで書く（例: TD_ACTION）。
 * - 生成されるテストIDは「コンポーネント名 + 項目名」で構成される（PascalCase）。
 *
 * 🛠 追加方法
 * 1. テストしたいコンポーネント用のオブジェクトを定義します（空文字でOK）。
 * 2. applyPrefixedValues関数に渡すことで、自動で値が生成されます。
 *
 * 🧪 例:
 * export const EXAMPLE_COMPONENT_TEST_ID = {
 *   BUTTON_SAVE: '',
 *   INPUT_NAME: '',
 * };
 * applyPrefixedValues({ EXAMPLE_COMPONENT_TEST_ID });
 *
 * 上記の結果：
 * EXAMPLE_COMPONENT_TEST_ID.BUTTON_SAVE → 'ExampleComponentButtonSave'
 * EXAMPLE_COMPONENT_TEST_ID.INPUT_NAME → 'ExampleComponentInputName'
 *
 * 🔖 利用方法 (テストコード内):
 * screen.getByTestId(TEST_IDS.EXAMPLE_COMPONENT.BUTTON_SAVE);
 *
 * IDEのコード補完やデバッグ時の視認性向上のため、現在の仕組みを採用しています。
 */
import { snakeToPascal } from '@lib/stringUtil';

export const applyPrefixedValues = <
  T extends Record<string, string>
>(testIdObject: {
  [key: string]: T;
}): void => {
  // testIdObject からキーと値（オブジェクト）を取得
  const [name, testId] = Object.entries(testIdObject)[0];
  const prefix = snakeToPascal(name.replace(/_TEST_ID$/, ''));

  (Object.keys(testId) as Array<keyof T>).forEach((key) => {
    testId[key] = `${prefix}${snakeToPascal(String(key))}` as T[keyof T];
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
applyPrefixedValues({ LIFELOG_DETAIL_DIALOG_TEST_ID });

export const LIFELOG_EDIT_DIALOG_TEST_ID = {
  BASE: '',
  BUTTON: '',
  DELETE: '',
  FINISH: '',
  SAVE: '',
};
applyPrefixedValues({ LIFELOG_EDIT_DIALOG_TEST_ID });

export const SIDE_MENU_TEST_ID = {
  SETTINGS: '',
  EDIT_ACCOUNT: '',
  LOGOUT: '',
  BUTTON: '',
};
applyPrefixedValues({ SIDE_MENU_TEST_ID });

export const ACCOUNT_UPDATE_TEST_ID = {
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  PASSWORD_CONFIRM_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues({ ACCOUNT_UPDATE_TEST_ID });

export const LOGIN_TEST_ID = {
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues({ LOGIN_TEST_ID });

export const SIGN_UP_TEST_ID = {
  FORM: '',
  EMAIL_INPUT: '',
  PASSWORD_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues({ SIGN_UP_TEST_ID });

export const PASSWORD_FORGET_TEST_ID = {
  EMAIL_INPUT: '',
  BUTTON: '',
};
applyPrefixedValues({ PASSWORD_FORGET_TEST_ID });

export const SESSION_OTHER_LINKS_TEST_ID = {
  PASSWORD_FORGET: '',
  SIGN_UP: '',
};
applyPrefixedValues({ SESSION_OTHER_LINKS_TEST_ID });

export const LIFELOG_LIST_TEST_ID = {
  SPINNER: '',
  NON_IDEA_STATE: '',
};
applyPrefixedValues({ LIFELOG_LIST_TEST_ID });

export const LIFELOG_LIST_ITEM_TEST_ID = {
  TD_STARTED_AT: '',
  LINK_TEXT: '',
  FINISH_BUTTON: '',
  EDIT_BUTTON: '',
  DELETE_BUTTON: '',
};
applyPrefixedValues({ LIFELOG_LIST_ITEM_TEST_ID });

export const LIFELOG_LIST_ITEM_SP_TEST_ID = {
  TR: '',
  TD: '',
};
applyPrefixedValues({ LIFELOG_LIST_ITEM_SP_TEST_ID });

export const SEARCH_INPUT_TEST_ID = {
  BASE: '',
  BUTTON: '',
};
applyPrefixedValues({ SEARCH_INPUT_TEST_ID });

export const TEST_IDS = {
  LIFELOG_DETAIL_DIALOG: LIFELOG_DETAIL_DIALOG_TEST_ID,
  LIFELOG_EDIT_DIALOG: LIFELOG_EDIT_DIALOG_TEST_ID,
  HEADER: SIDE_MENU_TEST_ID,
  ACCOUNT_UPDATE: ACCOUNT_UPDATE_TEST_ID,
  LOGIN: LOGIN_TEST_ID,
  SIGN_UP: SIGN_UP_TEST_ID,
  PASSWORD_FORGET: PASSWORD_FORGET_TEST_ID,
  SESSION_OTHER_LINKS: SESSION_OTHER_LINKS_TEST_ID,
  LIFELOG_LIST: LIFELOG_LIST_TEST_ID,
  LIFELOG_LIST_ITEM: LIFELOG_LIST_ITEM_TEST_ID,
  LIFELOG_LIST_ITEM_SP: LIFELOG_LIST_ITEM_SP_TEST_ID,
  SEARCH_INPUT: SEARCH_INPUT_TEST_ID,
};

export default TEST_IDS;
