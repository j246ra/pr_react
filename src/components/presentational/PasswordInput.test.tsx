import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './PasswordInput';
import { PASSWORD_INPUT } from '@lib/consts/component';

describe('ContextInput', () => {
  const mockOnChange = jest.fn();
  it('任意項目未指定時の各属性が正しく設定されている', () => {
    const { container } = render(
      <PasswordInput value={''} onChange={mockOnChange} />
    );
    const input = container.getElementsByTagName('input')[0];
    userEvent.type(input, 'テスト文字列');
    expect(mockOnChange).toHaveBeenCalled();
    expect(input.getAttribute('type')).toEqual('password');
    expect(input.id).toEqual('password-input');
    expect(input.required).toEqual(true);
    expect(input.placeholder).toEqual(PASSWORD_INPUT.PLACEHOLDER);
    expect(input.value).toEqual('');
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).toMatch(PASSWORD_INPUT.REQUIRED);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('任意項目指定時の各属性の確認', () => {
    const { container } = render(
      <PasswordInput
        value={'SecretPassw0rd'}
        onChange={mockOnChange}
        id={'input-test'}
        required={true}
        label={'ラベル確認用'}
        placeholder={'パスワードを入力してください。'}
        testId={'PasswordInputTestId'}
      />
    );
    const input = container.getElementsByTagName('input')[0];
    userEvent.type(input, 'テスト文字列');
    expect(mockOnChange).toHaveBeenCalled();
    expect(input.getAttribute('type')).toEqual('password');
    expect(input.id).toEqual('input-test');
    expect(input.required).toEqual(true);
    expect(input.placeholder).toEqual('パスワードを入力してください。');
    expect(input.value).toEqual('SecretPassw0rd');
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).toMatch('ラベル確認用');
    expect(screen.getByTestId('PasswordInputTestId')).toBeInTheDocument();
  });
  it('required が false の時必須ではない', () => {
    const { container } = render(
      <PasswordInput value={''} onChange={mockOnChange} required={false} />
    );
    const input = container.getElementsByTagName('input')[0];
    expect(input.required).toEqual(false);
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).not.toMatch(PASSWORD_INPUT.REQUIRED);
  });
});
