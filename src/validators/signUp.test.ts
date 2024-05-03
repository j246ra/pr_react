import signUpValidator from '@validators/signUp';
import { INVALID_MESSAGES } from '@validators/validator';
import { EMAIL_INPUT } from '@lib/consts/component';

describe('signUpValidator', () => {
  it('正常系', () => {
    const result = signUpValidator('test1@example.com', 'password');
    expect(result.isInvalid).toBe(false);
    expect(result.messages).toHaveLength(0);
  });
  describe('エラー系', () => {
    it('email がフォーマットエラーの場合', () => {
      const result = signUpValidator('test1.example.com', 'password');
      expect(result.isInvalid).toBe(true);
      expect(result.messages).toHaveLength(1);
      expect(result.messages).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
    });
    it('email が未入力の場合', () => {
      const result = signUpValidator('', 'password');
      expect(result.isInvalid).toBe(true);
      expect(result.messages).toHaveLength(1);
      expect(result.messages).toContain(
        INVALID_MESSAGES.TEXT_PRESENCE(EMAIL_INPUT.PLACEHOLDER)
      );
    });
    it('パスワードの長さエラーの場合', () => {
      const result = signUpValidator('test1@example.com', 'pasu');
      expect(result.isInvalid).toBe(true);
      expect(result.messages).toHaveLength(1);
      expect(result.messages).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
    });
    it('email と password ともにエラーの場合', () => {
      const result = signUpValidator('test1.example.com', 'pAss');
      expect(result.isInvalid).toBe(true);
      expect(result.messages).toHaveLength(2);
      expect(result.messages).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
      expect(result.messages).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
    });
  });
});
