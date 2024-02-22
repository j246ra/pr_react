import React, { useMemo } from 'react';
import { LifelogListItemProps } from '@lifelog/presentational/LifelogListItem';
import { EntityTitle } from '@blueprintjs/core';
import { days, DISPLAY_TIME } from '@lib/dateUtil';
import styles from './LifelogListItem.module.scss';

export function LifelogListItemSp({
  log,
  onFinishButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onActionClick,
}: LifelogListItemProps) {
  const startedAt = useMemo(() => days(log.startedAt), [log.startedAt]);
  const startedDay = useMemo(() => startedAt.format('YY/MM/DD'), [startedAt]);
  const startedTime = useMemo(
    () => startedAt.format(DISPLAY_TIME),
    [startedAt]
  );
  const actionTime = useMemo(() => {
    if (log.finishedAt) {
      const minutesDiff = days(log.finishedAt).diff(startedAt, 'minutes');
      const displayMinutes = minutesDiff > 999 ? 999 : minutesDiff;
      return ` (${displayMinutes})`;
    }
    return '';
  }, [log.finishedAt, startedAt]);
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
        {log.isDateChanged ? `${startedDay} ` : ''}
        {startedTime}
        {actionTime}
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
