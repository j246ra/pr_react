import React from 'react';
import styles from './Sessionform.module.scss';

type SessionFormProps = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SessionForm: React.FC<SessionFormProps> = ({ children, onSubmit }) => {
  return (
    <form className={styles.sessionForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default SessionForm;
