import React, { ReactNode } from 'react';
import { Card } from '@blueprintjs/core';

interface SessionCardProps {
  children: ReactNode;
}
const SessionCard: React.FC<SessionCardProps> = ({ children }) => {
  return (
    <div className="session-container">
      <Card elevation={2} className="session-card">
        {children}
      </Card>
    </div>
  );
};

export default SessionCard;
