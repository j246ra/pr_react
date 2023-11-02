import validator, { INVALID_MESSAGES } from '@validators/validator';

describe('Validators', () => {
  describe('textPresenceValidator', () => {
    const name = 'Test';
    const errorMessage = INVALID_MESSAGES.TEXT_PRESENCE(name);
    it('正常系', () => {
      const { result, textPresenceValidator } = validator();
      textPresenceValidator('正常系テスト', name);
      expect(result.isInvalid).toBe(false);
      expect(result.message).toHaveLength(0);
    });
    it('undefined の場合エラー', () => {
      const { result, textPresenceValidator } = validator();
      textPresenceValidator(undefined, name);
      expect(result.isInvalid).toBe(true);
      expect(result.message).toContain(errorMessage);
    });
    it('空白の場合エラー', () => {
      const { result, textPresenceValidator } = validator();
      textPresenceValidator('', name);
      expect(result.isInvalid).toBe(true);
      expect(result.message).toContain(errorMessage);
    });
  });

  describe('emailFormatValidator', () => {
    // const emailRegex = /^[\w+\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]+$/;
    const errorMessage = INVALID_MESSAGES.EMAIL_FORMAT;
    describe('正常系', () => {
      const validFormatChecker = (emailAddress: string) => {
        it(emailAddress, () => {
          const { result, emailFormatValidator } = validator();
          emailFormatValidator(emailAddress);
          expect(result.isInvalid).toBe(false);
          expect(result.message).toHaveLength(0);
        });
      };
      const validEmailAddresses = [
        'test1@example.com',
        'test1@1example.com',
        'test1@.example.com',
        'test1@-example.com',
        'test1@666example.com',
        'test1+999@example.com',
      ];
      validEmailAddresses.forEach((email) => {
        validFormatChecker(email);
      });
    });
    describe('フォーマットエラー', () => {
      const inValidFormatChecker = (emailAddress: string) => {
        it(emailAddress, () => {
          const { result, emailFormatValidator } = validator();
          emailFormatValidator(emailAddress);
          expect(result.isInvalid).toBe(true);
          expect(result.message).toContain(errorMessage);
        });
      };
      const inValidEmailAddresses = [
        'test1.example.com',
        'test1@666_example.com',
        'test1@666+example.com',
        'test1@example.666com',
      ];
      inValidEmailAddresses.forEach((email) => {
        inValidFormatChecker(email);
      });
    });
  });

  describe('passwordLengthValidator', () => {
    const errorMessage = INVALID_MESSAGES.PASSWORD_LENGTH;
    it('正常系', () => {
      const { result, passwordLengthValidator } = validator();
      passwordLengthValidator('pAssw0rd!');
      expect(result.isInvalid).toBe(false);
      expect(result.message).toHaveLength(0);
    });
    it('文字列長エラー', () => {
      const inValidLengthChecker = (password: string) => {
        const { result, passwordLengthValidator } = validator();
        passwordLengthValidator(password);
        expect(result.isInvalid).toBe(true);
        expect(result.message).toContain(errorMessage);
      };
      ['', 'pass', '1234567890'.repeat(12) + '123456789'].forEach(
        (password) => {
          inValidLengthChecker(password);
        }
      );
    });
  });
});
