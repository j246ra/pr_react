import React, { ReactNode } from 'react';
import styles from './BaseLayout.module.scss';

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className={styles.base_container}>{children}</div>;
};

export default BaseLayout;
