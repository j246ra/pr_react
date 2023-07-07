import React, { useCallback } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import dayjs from 'dayjs';
import { DATETIME_FULL } from '@lib/dateUtil';

export interface DatetimeInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (newDate: string | null) => void;
}

const MONTHS = [
  '１月',
  '２月',
  '３月',
  '４月',
  '５月',
  '６月',
  '７月',
  '８月',
  '９月',
  '１０月',
  '１１月',
  '１２月',
];

const WEEKDAYS_LONG = [
  '日曜日',
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日',
];

const WEEKDAYS_SHORT = ['日', '月', '火', '水', '木', '金', '土'];

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
          (date: Date) => dayjs(date).format(DATETIME_FULL),
          []
        )}
        parseDate={useCallback((date: string) => dayjs(date).toDate(), [])}
        locale={'ja'}
        dayPickerProps={{
          months: MONTHS,
          weekdaysShort: WEEKDAYS_SHORT,
          weekdaysLong: WEEKDAYS_LONG,
        }}
        timePrecision={TimePrecision.MINUTE}
        showTimezoneSelect={false}
        onChange={(newDate) => onChange(newDate)}
      />
    </FormGroup>
  );
};

export default DatetimeInput;
