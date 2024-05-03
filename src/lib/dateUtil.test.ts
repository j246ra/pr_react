import { daysDisplay, daysDisplayFull } from '@lib/dateUtil';

describe('dayDisplay', () => {
  it('日時が YY/MM/DD HH:mm 形式出力されている', () => {
    expect(daysDisplay('2023-11-16 14:23:41.921')).toEqual('23/11/16 14:23');
  });

  it('空白時は空白を出力している', () => {
    expect(daysDisplay('')).toBe('');
  });

  it('nullの時は空白を出力している', () => {
    expect(daysDisplay(null)).toBe('');
  });

  it('undefinedの時は空白を出力している', () => {
    expect(daysDisplay(undefined)).toBe('');
  });
});

describe('dayDisplayFull', () => {
  it('日時が YYYY-MM-DD HH:mm:ss 形式出力されている', () => {
    expect(daysDisplayFull('2023-11-16 14:23:41.921')).toEqual(
      '2023/11/16 14:23:41'
    );
  });

  it('空白時は空白を出力している', () => {
    expect(daysDisplayFull('')).toBe('');
  });

  it('nullの時は空白を出力している', () => {
    expect(daysDisplayFull(null)).toBe('');
  });

  it('undefinedの時は空白を出力している', () => {
    expect(daysDisplayFull(undefined)).toBe('');
  });
});
