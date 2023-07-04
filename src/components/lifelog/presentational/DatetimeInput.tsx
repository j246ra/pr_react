import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

export interface DatetimeInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
}
const DatetimeInput: React.FC<DatetimeInputProps> = ({
  id,
  label,
  placeholder,
  value,
}) => {
  return (
    <FormGroup label={label} labelFor={id}>
      <InputGroup id={id} placeholder={placeholder} value={value} />
    </FormGroup>
  );
};

export default DatetimeInput;
