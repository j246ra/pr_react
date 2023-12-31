import React, { useCallback } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import { days, DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import { DATETIME_INPUT } from '@lib/consts/component';

export type DatetimeInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (newDate: string | null) => void;
};

const DatetimeInput = ({
  label,
  placeholder,
  value,
  onChange,
}: DatetimeInputProps) => {
  return (
    <FormGroup label={label}>
      <DateInput
        defaultValue={value}
        value={value}
        placeholder={placeholder}
        formatDate={useCallback(
          (date: Date) => days(date).format(DISPLAY_DATETIME_FULL),
          []
        )}
        parseDate={useCallback((date: string) => days(date).toDate(), [])}
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
