import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { PASSWORD_INPUT } from '@lib/consts';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  id = 'password-input',
  required = true,
  label = PASSWORD_INPUT.LABEL,
  placeholder = PASSWORD_INPUT.PLACEHOLDER,
}) => (
  <FormGroup
    label={label}
    labelFor={id}
    labelInfo={required ? PASSWORD_INPUT.REQUIRED : ''}
  >
    <InputGroup
      id={id}
      data-testid={id}
      placeholder={placeholder}
      type="password"
      value={value}
      onChange={onChange}
      required={required}
    />
  </FormGroup>
);
