import React, { ChangeEvent } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { EMAIL_INPUT } from '@lib/consts/component';

export interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  placeholder?: string;
  testId?: string;
}

export const EmailInput = ({
  value,
  onChange,
  id = 'email-input',
  required = true,
  placeholder = EMAIL_INPUT.PLACEHOLDER,
  testId = id,
}: EmailInputProps) => (
  <FormGroup
    label="メールアドレス"
    labelFor={id}
    labelInfo={required ? EMAIL_INPUT.REQUIRED : ''}
  >
    <InputGroup
      id={id}
      data-testid={testId}
      placeholder={placeholder}
      type="email"
      value={value}
      onChange={onChange}
      required={required}
    />
  </FormGroup>
);
