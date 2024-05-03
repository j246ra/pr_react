import React, { useCallback } from 'react';
import { FormGroup } from '@blueprintjs/core';
import { days, DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import { DATETIME_INPUT } from '@lib/consts/component';
import { DateInput3, TimePrecision } from '@blueprintjs/datetime2';

export type DatetimeInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (newDate: string | null) => void;
};

export default function DatetimeInput({
  label,
  placeholder,
  value,
  onChange,
}: DatetimeInputProps) {
  return (
    <FormGroup label={label}>
      <DateInput3
        defaultValue={value}
        value={value}
        placeholder={placeholder}
        formatDate={useCallback(
          (date: Date) => days(date).format(DISPLAY_DATETIME_FULL),
          []
        )}
        parseDate={useCallback((date: string) => days(date).toDate(), [])}
        locale={DATETIME_INPUT.LOCALE}
        timePrecision={TimePrecision.MINUTE}
        showTimezoneSelect={false}
        onChange={(newDate) => onChange(newDate)}
      />
    </FormGroup>
  );
}
