import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContextInput from './ContextInput';

describe('ContextInput', () => {
  it('レンダリングとイベントハンドラの動作を正しく行う', () => {
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    const { getByPlaceholderText } = render(
      <ContextInput
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
        placeholder="テスト用のプレースホルダ"
      />
    );

    const input = getByPlaceholderText('テスト用のプレースホルダ');

    // onChangeイベントのテスト
    userEvent.type(input, 'テスト文字列');
    expect(mockOnChange).toHaveBeenCalled();

    // onSubmitイベントのテスト
    userEvent.type(input, '{enter}');
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
