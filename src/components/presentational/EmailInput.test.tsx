import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { EmailInput } from './EmailInput';

describe('ContextInput', () => {
  const mockOnChange = jest.fn();
  it('任意項目未指定時の各属性が正しく設定されている', () => {
    const { container } = render(
      <EmailInput value={''} onChange={mockOnChange} />
    );
    const input = container.getElementsByTagName('input')[0];
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input.getAttribute('type')).toEqual('email');
    expect(input.id).toEqual('email-input');
    expect(input.required).toEqual(true);
    expect(input.placeholder).toEqual('メールアドレスを入力');
    expect(input.value).toEqual('');
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).toMatch('必須');
  });
  it('任意項目指定時の各属性の確認', async () => {
    const { container } = render(
      <EmailInput
        value={'SecretPassw0rd'}
        onChange={mockOnChange}
        id={'input-test'}
        required={true}
        placeholder={'メールアドレスを入力してください。'}
      />
    );
    const input = container.getElementsByTagName('input')[0];
    expect(input.getAttribute('type')).toEqual('email');
    expect(input.id).toEqual('input-test');
    expect(input.required).toEqual(true);
    expect(input.placeholder).toEqual('メールアドレスを入力してください。');
    expect(input.value).toEqual('SecretPassw0rd');
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).toMatch('必須');
    userEvent.type(input, 'テスト文字列');
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(6);
      // 入力値の検証は親コンポーネントで行う
    });
  });
  it('required が false の時必須ではない', () => {
    const { container } = render(
      <EmailInput value={''} onChange={mockOnChange} required={false} />
    );
    const input = container.getElementsByTagName('input')[0];
    expect(input.required).toEqual(false);
    const label = container.getElementsByTagName('label')[0];
    expect(label.textContent).not.toMatch('必須');
  });
});
