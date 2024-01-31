import React from 'react';
import styles from './LifelogListHeader.module.scss';
import { LIFELOG_LIST_HEADER } from '@lib/consts/component';

export type LifelogListHeaderProps = {
  enabled?: boolean;
};
export default function LifelogListHeader({
  enabled = true,
}: LifelogListHeaderProps) {
  if (!enabled) return null;
  return (
    <thead>
      <tr>
        <th className={styles.thStartedAt}>{LIFELOG_LIST_HEADER.STARTED_AT}</th>
        <th className={styles.thAction}>{LIFELOG_LIST_HEADER.ACTION}</th>
        <th>{LIFELOG_LIST_HEADER.DETAIL}</th>
        <th className={styles.thOperation}>{LIFELOG_LIST_HEADER.OPERATION}</th>
      </tr>
    </thead>
  );
}
