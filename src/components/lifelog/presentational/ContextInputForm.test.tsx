import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextInputForm from './ContextInputForm';
import { CONTEXT_INPUT } from '@lib/consts/component';

const mockOnSubmit = jest.fn((e) => e.preventDefault());

describe('ContextInputForm', () => {
  it('レンダリングとイベントハンドラの動作を正しく行う', () => {
    let str = '';
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      str = e.target.value;
    };
    const { getByPlaceholderText } = render(
      <ContextInputForm
        onSubmit={mockOnSubmit}
        onChange={handleOnChange}
        placeholder="テスト用のプレースホルダ"
      />
    );

    const input = getByPlaceholderText('テスト用のプレースホルダ');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('required');
    userEvent.type(input, 'テスト文字列');
    expect(str).toEqual('テスト文字列');
    userEvent.type(input, '{enter}');
    expect(mockOnSubmit).toHaveBeenCalled();
  });
  it('Props デフォルト値確認', () => {
    render(<ContextInputForm onSubmit={jest.fn} onChange={jest.fn} />);
    const input = screen.getByPlaceholderText(CONTEXT_INPUT.PLACEHOLDER);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value');
  });
});
