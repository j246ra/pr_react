import React from 'react';
import { render } from '@testing-library/react';
import ResetMailSendSuccess from './ResetMailSendSuccess';

describe('ResetMailSendSuccess コンポーネント', () => {
  it('送信成功メッセージを表示する', () => {
    const { getByText } = render(<ResetMailSendSuccess />);
    expect(
      getByText('送信に成功しました。メールをご確認ください。')
    ).toBeInTheDocument();
  });
});
