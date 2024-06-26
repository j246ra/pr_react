import React, { ChangeEvent, FormEvent } from 'react';
import { Button, ControlGroup, InputGroup, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styles from './ContextInputForm.module.scss';
import { CONTEXT_INPUT } from '@lib/consts/component';

export type ContextInputFormProps = {
  onSubmit: (e: FormEvent) => void;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function ContextInputForm({
  onSubmit,
  value,
  onChange,
  placeholder = CONTEXT_INPUT.PLACEHOLDER,
}: ContextInputFormProps) {
  return (
    <div className={styles.base}>
      <form onSubmit={onSubmit}>
        <ControlGroup>
          <InputGroup
            className={styles.inputGroup}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={true}
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
}
