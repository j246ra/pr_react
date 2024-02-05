import React, { ReactNode } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import styles from './SessionCard.module.scss';

export type SessionCardProps = {
  children: ReactNode;
  interactive?: boolean;
  elevation?: Elevation;
};
export default function SessionCard({
  children,
  interactive = false,
  elevation = Elevation.TWO,
}: SessionCardProps) {
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
}
