import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

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
  label = 'パスワード',
  placeholder = 'パスワードを入力',
}) => (
  <FormGroup label={label} labelFor={id} labelInfo={required ? '(必須)' : ''}>
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
