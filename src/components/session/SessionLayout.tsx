import React, { ReactNode } from 'react';
import styles from './SessionLayout.module.scss';

export type SessionLayoutProps = {
  children: ReactNode;
};
const SessionLayout: React.FC<SessionLayoutProps> = ({ children }) => {
  return (
    <div className={styles.base}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default SessionLayout;
