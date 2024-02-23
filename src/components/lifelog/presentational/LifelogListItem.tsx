import React, { useMemo } from 'react';
import { Button, EntityTitle, Intent, Tooltip } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogListItem.module.scss';
import { days, DISPLAY_DATETIME, DISPLAY_TIME } from '@lib/dateUtil';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { top } from '@popperjs/core';

export type LifelogListItemProps = {
  log: Lifelog;
  onEditButtonClick: () => void;
  onActionClick: () => void;
};
export function LifelogListItem({
  log,
  onEditButtonClick,
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
  const actionTime = useMemo(() => {
    if (log.finishedAt) {
      const minutesDiff = days(log.finishedAt).diff(startedDay, 'minutes');
      const displayMinutes = minutesDiff > 999 ? 999 : minutesDiff;
      return ` (${displayMinutes})`;
    }
    return '';
  }, [log.finishedAt, startedDay]);

  const displayDatetime = useMemo(
    () => (log.isDateChanged ? startedDatetime : startedTime),
    [log.isDateChanged, startedDatetime, startedTime]
  );

  return (
    <tr className={styles.trItem}>
      <td
        data-testid={TEST_ID.TD_STARTED_AT}
        className={log.finishedAt ? styles.tdStartedAtBold : styles.tdStartedAt}
      >
        <Tooltip content={startedDatetime} placement={top} compact={true}>
          {displayDatetime + actionTime}
        </Tooltip>
      </td>
      <td
        data-testid={TEST_ID.LINK_TEXT + log.id}
        className={styles.tdAction}
        onClick={onActionClick}
      >
        <EntityTitle title={log.action} subtitle={log.detail || ''} />
      </td>
      <td className={styles.tdOperation}>
        <Button
          className={`${styles.editButton} ${styles.button}`}
          data-testid={TEST_ID.EDIT_BUTTON + log.id}
          intent={Intent.SUCCESS}
          icon={IconNames.EDIT}
          minimal={true}
          onClick={onEditButtonClick}
        />
      </td>
    </tr>
  );
}

export default LifelogListItem;
