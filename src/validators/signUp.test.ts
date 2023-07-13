import signUpValidator from '@validators/signUp';
import { INVALID_MESSAGES } from '@validators/validator';

describe('signUpValidator', () => {
  it('正常系', () => {
    const result = signUpValidator('test1@example.com', 'password');
    expect(result.isInvalid).toBe(false);
    expect(result.message).toHaveLength(0);
  });
  describe('エラー系', () => {
    it('email がフォーマットエラーの場合', () => {
      const result = signUpValidator('test1.example.com', 'password');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
    });
    it('email が未入力の場合', () => {
      const result = signUpValidator('', 'password');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(
        INVALID_MESSAGES.TEXT_PRESENCE('メールアドレス')
      );
    });
    it('パスワードの長さエラーの場合', () => {
      const result = signUpValidator('test1@example.com', 'pasu');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
    });
    it('email と password ともにエラーの場合', () => {
      const result = signUpValidator('test1.example.com', 'pAss');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(2);
      expect(result.message).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
      expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
    });
  });
});
