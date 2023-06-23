import React, { ChangeEvent, FormEvent } from 'react';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

export interface ContextInputProps {
  onSubmit: (e: FormEvent) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  placeholder?: string;
}

export const ContextInput: React.FC<ContextInputProps> = ({
  onSubmit,
  value,
  onChange,
  id = 'context-input',
  required = true,
  placeholder = '行動を入力(空白以降は詳細として記録されます)',
}) => (
  <form onSubmit={onSubmit}>
    <ControlGroup>
      <InputGroup
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <Button icon={IconNames.ADD} />
    </ControlGroup>
  </form>
);

export default ContextInput;
