import React, { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div
      className={'base-container app-max-width'}
      style={{
        padding: '20px',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
};

export default BaseLayout;
