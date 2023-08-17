import React from 'react';
import styles from './LifelogListHeader.module.scss';

export interface LifelogListHeaderProps {
  enabled?: boolean;
}
export const LifelogListHeader: React.FC<LifelogListHeaderProps> = ({
  enabled = true,
}) => {
  return (
    <thead className={`${enabled ? '' : styles.thead}`}>
      <tr>
        <th className={styles.thStartedAt}>開始時間</th>
        <th className={styles.thFinishedAt}>行動内容</th>
        <th>詳細</th>
        <th className={styles.thOperation}>操作</th>
      </tr>
    </thead>
  );
};

export default LifelogListHeader;
