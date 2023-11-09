import { snakeToPascal } from '@lib/stringUtil';

describe('stringUtil', () => {
  it('スネークケースからパスカルケースへ変換', () => {
    expect(snakeToPascal('TEST_XYZ')).toEqual('TestXyz');
    expect(snakeToPascal('TESTXYZ')).toEqual('Testxyz');
    expect(snakeToPascal('TESTXYZ_1')).toEqual('Testxyz1');
    expect(snakeToPascal('_XYZ')).toEqual('Xyz');
    expect(snakeToPascal('TEST_XYZ_ABC')).toEqual('TestXyzAbc');
  });

  it('スネークケースでないものはそのまま出力する', () => {
    expect(snakeToPascal('test_abc-xyz')).toEqual('TestAbc-xyz');
    expect(snakeToPascal('')).toEqual('');
    expect(snakeToPascal('____')).toEqual('____');
  });
});
