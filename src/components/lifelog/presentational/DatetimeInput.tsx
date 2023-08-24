import React, { useCallback } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import dayjs from 'dayjs';
import { DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import { DATETIME_INPUT } from '@lib/consts/component';

export interface DatetimeInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (newDate: string | null) => void;
}

const DatetimeInput: React.FC<DatetimeInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <FormGroup label={label}>
      <DateInput
        defaultValue={value}
        value={value}
        placeholder={placeholder}
        formatDate={useCallback(
          (date: Date) => dayjs(date).format(DISPLAY_DATETIME_FULL),
          []
        )}
        parseDate={useCallback((date: string) => dayjs(date).toDate(), [])}
        locale={DATETIME_INPUT.LOCALE}
        dayPickerProps={{
          months: DATETIME_INPUT.MONTHS,
          weekdaysShort: DATETIME_INPUT.WEEKDAYS_SHORT,
          weekdaysLong: DATETIME_INPUT.WEEKDAYS_LONG,
        }}
        timePrecision={TimePrecision.MINUTE}
        showTimezoneSelect={false}
        onChange={(newDate) => onChange(newDate)}
      />
    </FormGroup>
  );
};

export default DatetimeInput;
