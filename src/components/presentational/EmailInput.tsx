import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { EMAIL_INPUT } from '@lib/consts';

export interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  placeholder?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  id = 'email-input',
  required = true,
  placeholder = EMAIL_INPUT.PLACEHOLDER,
}) => (
  <FormGroup
    label="メールアドレス"
    labelFor={id}
    labelInfo={required ? EMAIL_INPUT.REQUIRED : ''}
  >
    <InputGroup
      id={id}
      data-testid={id}
      placeholder={placeholder}
      type="email"
      value={value}
      onChange={onChange}
      required={required}
    />
  </FormGroup>
);
