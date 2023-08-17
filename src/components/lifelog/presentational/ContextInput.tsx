import React, { ChangeEvent, FormEvent } from 'react';
import { Button, ControlGroup, InputGroup, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styles from './ContextInput.module.scss';

export interface ContextInputProps {
  onSubmit: (e: FormEvent) => void;
  value?: string;
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
}) => {
  return (
    <div className={styles.base}>
      <form onSubmit={onSubmit}>
        <ControlGroup>
          <InputGroup
            className={styles.inputGroup}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
          <Button
            type={'submit'}
            minimal={true}
            intent={Intent.PRIMARY}
            icon={IconNames.ADD}
          />
        </ControlGroup>
      </form>
    </div>
  );
};

export default ContextInput;
