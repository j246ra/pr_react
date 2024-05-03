import React, { ReactNode } from 'react';
import styles from './BaseLayout.module.scss';

export type BaseLayoutProps = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return <div className={styles.baseContainer}>{children}</div>;
}
