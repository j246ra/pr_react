import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  id = 'email-input',
  placeholder = 'メールアドレスを入力',
}) => (
  <FormGroup label="メールアドレス" labelFor={id} labelInfo="(必須)">
    <InputGroup
      id={id}
      placeholder={placeholder}
      type="email"
      value={value}
      onChange={onChange}
      required
    />
  </FormGroup>
);
