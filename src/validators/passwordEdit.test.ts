import passwordEditValidator from '@validators/passwordEdit';
import { INVALID_MESSAGES } from '@validators/validator';
import { PASSWORD_EDIT, PASSWORD_INPUT } from '@lib/consts';

describe('signUpValidator', () => {
  it('正常系', () => {
    const result = passwordEditValidator('password', 'password');
    expect(result.isInvalid).toBe(false);
    expect(result.message).toHaveLength(0);
  });
  it('パスワードが未入力', () => {
    const result = passwordEditValidator('', 'pass');
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(PASSWORD_INPUT.LABEL)
    );
  });
  it('確認用パスワードが未入力', () => {
    const result = passwordEditValidator('word', '');
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(PASSWORD_EDIT.PASSWORD_CONFIRM.LABEL)
    );
  });
  it('2つのパスワードが未入力', () => {
    const result = passwordEditValidator('', '');
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(2);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(PASSWORD_INPUT.LABEL)
    );
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(PASSWORD_EDIT.PASSWORD_CONFIRM.LABEL)
    );
  });
  it('2つのパスワードが一致しない', () => {
    const result = passwordEditValidator('password', 'PASSWORD');
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_NO_MATCH);
  });
  it('2つのパスワードの長さがエラーの場合', () => {
    const result = passwordEditValidator('PASSW', 'PASSW');
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
  });
});
