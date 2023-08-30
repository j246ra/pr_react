import React, { ReactNode } from 'react';
import styles from './BaseLayout.module.scss';

export type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className={styles.baseContainer}>{children}</div>;
};

export default BaseLayout;
