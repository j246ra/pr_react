import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface PasswordInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
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
