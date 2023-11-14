import { applyPrefixedValues } from '@lib/consts/testId';

describe('applyPrefixedValues', () => {
  describe('オブジェクト名の末尾が', () => {
    it('TEST_IDの場合、それ以外でprefixがが自動生成されている', () => {
      const MY_APP_TEST_ID = {
        ID: '',
        FIRST_NAME: '',
        ADDRESS_1: '',
        ADDRESS_2: '',
      };
      applyPrefixedValues({ MY_APP_TEST_ID });
      expect(MY_APP_TEST_ID).toEqual({
        ID: 'MyAppId',
        FIRST_NAME: 'MyAppFirstName',
        ADDRESS_1: 'MyAppAddress1',
        ADDRESS_2: 'MyAppAddress2',
      });
    });

    it('TEST_IDではない場合、オブジェクト名でprefixが自動生成されている', () => {
      const MY_GREAT_APP = {
        ID: '',
        FIRST_NAME: '',
        ADDRESS_1: '',
        ADDRESS_2: '',
      };
      applyPrefixedValues({ MY_GREAT_APP });
      expect(MY_GREAT_APP).toEqual({
        ID: 'MyGreatAppId',
        FIRST_NAME: 'MyGreatAppFirstName',
        ADDRESS_1: 'MyGreatAppAddress1',
        ADDRESS_2: 'MyGreatAppAddress2',
      });
    });
  });

  it('空オブジェクトの場合でも正常に処理されていること', () => {
    const MY_TEST_ID = {};
    applyPrefixedValues({ MY_TEST_ID });
    expect(MY_TEST_ID).toEqual({});
  });
});
