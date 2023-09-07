import React, { ReactNode } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import styles from './SessionCard.module.scss';

export type SessionCardProps = {
  children: ReactNode;
  interactive?: boolean;
  elevation?: Elevation;
};
const SessionCard: React.FC<SessionCardProps> = ({
  children,
  interactive = false,
  elevation = Elevation.TWO,
}) => {
  return (
    <div className={styles.sessionContainer}>
      <Card
        elevation={elevation}
        interactive={interactive}
        className={styles.sessionCard}
      >
        {children}
      </Card>
    </div>
  );
};

export default SessionCard;
