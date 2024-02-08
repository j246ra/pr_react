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
  onFinishButtonClick: () => void;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
  onActionClick: () => void;
};
export function LifelogListItem({
  log,
  onFinishButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onActionClick,
}: LifelogListItemProps) {
  const startedDatetime = useMemo(
    () => days(log.startedAt).format(DISPLAY_DATETIME),
    [log.startedAt]
  );
  const startedTime = useMemo(
    () => days(log.startedAt).format(DISPLAY_TIME),
    [log.startedAt]
  );

  return (
    <tr className={styles.trItem}>
      <td
        className={log.finishedAt ? styles.tdStartedAtBold : styles.tdStartedAt}
      >
        <Tooltip content={startedDatetime} placement={top} compact={true}>
          {startedTime}
        </Tooltip>
      </td>
      <td
        data-testid={TEST_ID.LINK_TEXT + log.id}
        className={styles.tdAction}
        onClick={onActionClick}
      >
        <EntityTitle title={log.action} subtitle={log.detail} />
      </td>
      <td className={styles.tdOperation}>
        <Button
          className={styles.button}
          data-testid={TEST_ID.FINISH_BUTTON + log.id}
          intent={Intent.PRIMARY}
          icon={IconNames.STOPWATCH}
          minimal={true}
          onClick={onFinishButtonClick}
        />
        <Button
          className={`${styles.editButton} ${styles.button}`}
          data-testid={TEST_ID.EDIT_BUTTON + log.id}
          intent={Intent.SUCCESS}
          icon={IconNames.EDIT}
          minimal={true}
          onClick={onEditButtonClick}
        />
        <Button
          className={`${styles.deleteButton} ${styles.button}`}
          data-testid={TEST_ID.DELETE_BUTTON + log.id}
          intent={Intent.DANGER}
          icon={IconNames.DELETE}
          minimal={true}
          onClick={onDeleteButtonClick}
        />
      </td>
    </tr>
  );
}

export default React.memo(LifelogListItem, (prevProps, nextProps) => {
  return prevProps.log === nextProps.log;
});
