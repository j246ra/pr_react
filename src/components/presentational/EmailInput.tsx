import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface EmailInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
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
