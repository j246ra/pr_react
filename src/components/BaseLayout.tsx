import React, { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div
      className={'base-container'}
      style={{
        display: 'flex',
        height: '100vh',
        maxWidth: 1280,
        padding: 20,
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
};

export default BaseLayout;
