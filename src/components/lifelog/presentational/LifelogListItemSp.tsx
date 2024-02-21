import React, { useMemo } from 'react';
import { LifelogListItemProps } from '@lifelog/presentational/LifelogListItem';
import { EntityTitle } from '@blueprintjs/core';
import { days, DISPLAY_DATETIME, DISPLAY_TIME } from '@lib/dateUtil';
import styles from './LifelogListItem.module.scss';

export function LifelogListItemSp({
  log,
  onFinishButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onActionClick,
}: LifelogListItemProps) {
  const startedDay = useMemo(() => days(log.startedAt), [log.startedAt]);
  const startedDatetime = useMemo(
    () => startedDay.format(DISPLAY_DATETIME),
    [startedDay]
  );
  const startedTime = useMemo(
    () => startedDay.format(DISPLAY_TIME),
    [startedDay]
  );
  const displayDatetime = useMemo(
    () => (log.isDateChanged ? startedDatetime : startedTime),
    [log.isDateChanged, startedDatetime, startedTime]
  );

  return (
    <tr className={styles.trItem}>
      <td className={styles.tdAction} onClick={onEditButtonClick}>
        <EntityTitle
          title={`${displayDatetime} ${log.action}`}
          subtitle={log.detail || ''}
        />
      </td>
    </tr>
  );
}

export default LifelogListItemSp;
