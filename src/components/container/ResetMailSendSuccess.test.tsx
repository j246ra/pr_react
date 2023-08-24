import React from 'react';
import { render } from '@testing-library/react';
import ResetMailSendSuccess from './ResetMailSendSuccess';
import { RESET_MAIL_SUCCESS } from '@lib/consts/component';

describe('ResetMailSendSuccess コンポーネント', () => {
  it('送信成功メッセージを表示する', () => {
    const { getByText } = render(<ResetMailSendSuccess />);
    expect(getByText(RESET_MAIL_SUCCESS.INFO)).toBeInTheDocument();
  });
});
