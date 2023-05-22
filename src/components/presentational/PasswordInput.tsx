import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  id = 'password-input',
  placeholder = 'パスワードを入力',
}) => (
  <FormGroup label="パスワード" labelFor={id} labelInfo="(必須)">
    <InputGroup
      id={id}
      placeholder={placeholder}
      type="password"
      value={value}
      onChange={onChange}
      required
    />
  </FormGroup>
);
