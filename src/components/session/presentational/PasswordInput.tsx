import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { PASSWORD_INPUT } from '@lib/consts/component';

type PasswordInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  testId?: string;
};

export default function PasswordInput({
  value,
  onChange,
  id = 'password-input',
  required = true,
  label = PASSWORD_INPUT.LABEL,
  placeholder = PASSWORD_INPUT.PLACEHOLDER,
  testId = id,
}: PasswordInputProps) {
  return (
    <FormGroup
      label={label}
      labelFor={id}
      labelInfo={required ? PASSWORD_INPUT.REQUIRED : ''}
    >
      <InputGroup
        id={id}
        data-testid={testId}
        placeholder={placeholder}
        type="password"
        value={value}
        onChange={onChange}
        required={required}
      />
    </FormGroup>
  );
}
