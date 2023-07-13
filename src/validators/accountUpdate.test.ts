import accountUpdateValidator from '@validators/accountUpdate';
import { INVALID_MESSAGES } from '@validators/validator';

describe('accountUpdateValidator', () => {
  describe('正常系', () => {
    it('全項目が入力の場合', () => {
      const result = accountUpdateValidator(
        'test1@example.com',
        'Password',
        'Password'
      );
      expect(result.isInvalid).toBe(false);
      expect(result.message).toHaveLength(0);
    });
    it('メールアドレスのみ入力の場合', () => {
      const result = accountUpdateValidator('test1@example.com');
      expect(result.isInvalid).toBe(false);
      expect(result.message).toHaveLength(0);
    });
    it('パスワードのみ入力の場合', () => {
      const result = accountUpdateValidator('', 'Password', 'Password');
      expect(result.isInvalid).toBe(false);
      expect(result.message).toHaveLength(0);
    });
  });

  describe('異常系', () => {
    it('不正なメールアドレスの場合', () => {
      const result = accountUpdateValidator('test1.example.com');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
    });
    it('2つパスワードが一致しない場合', () => {
      const result = accountUpdateValidator('', 'Pass', 'PASS');
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_NO_MATCH);
    });
    it('パスワード長エラーの場合', () => {
      const result = accountUpdateValidator(
        'test1@example.com',
        'PASS',
        'PASS'
      );
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(1);
      expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_LENGTH);
    });
    it('メールアドレスとパスワードともにエラーの場合', () => {
      const result = accountUpdateValidator(
        'test1@++++example.com',
        'PASSWORD',
        'password'
      );
      expect(result.isInvalid).toBe(true);
      expect(result.message).toHaveLength(2);
      expect(result.message).toContain(INVALID_MESSAGES.EMAIL_FORMAT);
      expect(result.message).toContain(INVALID_MESSAGES.PASSWORD_NO_MATCH);
    });
  });
});
