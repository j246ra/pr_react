import { applyPrefixedValues } from '@lib/consts/testId';

describe('applyPrefixedValues', () => {
  it('正常系', () => {
    const MY_TEST_ID = {
      ID: '',
      FIRST_NAME: '',
      ADDRESS_1: '',
      ADDRESS_2: '',
    };
    applyPrefixedValues('LifelogApp', MY_TEST_ID);
    expect(MY_TEST_ID).toEqual({
      ID: 'LifelogAppId',
      FIRST_NAME: 'LifelogAppFirstName',
      ADDRESS_1: 'LifelogAppAddress1',
      ADDRESS_2: 'LifelogAppAddress2',
    });
  });
  it('異常系', () => {
    const MY_TEST_ID = {};
    applyPrefixedValues('LifelogApp', MY_TEST_ID);
    expect(MY_TEST_ID).toEqual({});
  });
});
