import React, { ReactNode } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import './session.scss';

export interface SessionCardProps {
  children: ReactNode;
  interactive?: boolean;
  elevation?: Elevation;
}
const SessionCard: React.FC<SessionCardProps> = ({
  children,
  interactive = false,
  elevation = Elevation.TWO,
}) => {
  return (
    <div className="session-container">
      <Card
        elevation={elevation}
        interactive={interactive}
        className="session-card"
      >
        {children}
      </Card>
    </div>
  );
};

export default SessionCard;
