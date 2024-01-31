import React, { ReactNode } from 'react';
import styles from './SessionLayout.module.scss';

export type SessionLayoutProps = {
  children: ReactNode;
};
export default function SessionLayout({ children }: SessionLayoutProps) {
  return (
    <div className={styles.base}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
