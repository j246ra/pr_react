import React, { useMemo } from 'react';
import { LifelogListItemProps } from '@lifelog/presentational/LifelogListItem';
import { EntityTitle } from '@blueprintjs/core';
import styles from './LifelogListItem.module.scss';
import useActionTimeDisplay from '@src/hooks/useActionTimeDisplay';

type LifelogListItemSpProps = Omit<LifelogListItemProps, 'onActionClick'>;

export function LifelogListItemSp({
  log,
  onEditButtonClick,
}: LifelogListItemSpProps) {
  const { displayDatetime, displayActionTime } = useActionTimeDisplay(log);
  const detail = useMemo(() => {
    if (log.detail)
      return log.detail.length > 52
        ? `${log.detail?.slice(0, 52)}...`
        : log.detail;
    return null;
  }, [log.detail]);

  return (
    <tr className={styles.trItem}>
      <td
        className={log.finishedAt ? styles.tdStartedAtBold : styles.tdStartedAt}
        style={{ padding: '3px' }}
        onClick={onEditButtonClick}
      >
        {displayDatetime + displayActionTime}
        <EntityTitle
          className={styles.tdAction}
          title={log.action}
          subtitle={detail || ''}
        />
      </td>
    </tr>
  );
}

export default LifelogListItemSp;
