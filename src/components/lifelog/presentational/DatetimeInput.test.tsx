import { act, render, screen, waitFor } from '@testing-library/react';
import DatetimeInput from '@lifelog/presentational/DatetimeInput';
import { DATETIME_FULL, days, DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import userEvent from '@testing-library/user-event';

describe('DatetimeInput', () => {
  const mockOnChange = jest.fn();
  let date: ReturnType<typeof days>;
  const props = {
    label: '時間',
    placeholder: '時間を入力してください',
    onChange: mockOnChange,
    value: '',
  };

  beforeEach(() => {
    date = days();
    props.value = date.format(DATETIME_FULL);
  });

  it('テキストフォームの初期値検証', () => {
    render(<DatetimeInput {...props} />);

    const el = screen.getByText(props.label);
    expect(el.tagName).toEqual('LABEL');
    const input = screen.getByPlaceholderText(
      props.placeholder
    ) as HTMLInputElement;
    expect(input.tagName).toEqual('INPUT');
    expect(input.value).toEqual(date.format(DISPLAY_DATETIME_FULL));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('コールバック検証', async () => {
    render(<DatetimeInput {...props} />);

    const input = screen.getByPlaceholderText(
      props.placeholder
    ) as HTMLInputElement;
    act(() => {
      userEvent.clear(input);
      userEvent.type(input, '2023-09-15 11:11:11');
    });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
      expect(input.value).toEqual('2023-09-15 11:11:11');
    });
  });

  it('datepicker 表示検証', async () => {
    render(<DatetimeInput {...props} />);

    expect(screen.queryAllByLabelText('日曜日')).toHaveLength(0);
    const input = screen.queryByPlaceholderText(
      props.placeholder
    ) as HTMLInputElement;
    act(() => userEvent.click(input));
    await waitFor(() => {
      expect(screen.queryAllByLabelText('日曜日')).toHaveLength(1);
    });
  });
});
