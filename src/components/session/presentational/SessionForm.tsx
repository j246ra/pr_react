import React from 'react';
import styles from './Sessionform.module.scss';

type SessionFormProps = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SessionForm({ children, onSubmit }: SessionFormProps) {
  return (
    <form className={styles.sessionForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
