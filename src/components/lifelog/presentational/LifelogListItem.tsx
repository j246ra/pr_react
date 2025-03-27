import React, { useMemo } from 'react';
import { Button, EntityTitle, Intent, Tooltip } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogListItem.module.scss';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { top } from '@popperjs/core';
import useActionTimeDisplay from '@src/hooks/useActionTimeDisplay';

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
  const { startedDatetime, displayActionTime, displayDatetime } =
    useActionTimeDisplay(log);
  const classNameTdStartedAT = useMemo(() => {
    if (log.finishedAt) return `${styles.bold} ${styles.tdStartedAt}`;
    else return styles.tdStartedAt;
  }, [log.finishedAt]);

  return (
    <tr className={styles.trItem}>
      <td
        data-testid={TEST_ID.TD_STARTED_AT + log.id}
        className={classNameTdStartedAT}
      >
        <Tooltip content={startedDatetime} placement={top} compact={true}>
          {displayDatetime + displayActionTime}
        </Tooltip>
      </td>
      <td
        data-testid={TEST_ID.LINK_TEXT + log.id}
        className={styles.tdAction}
        onClick={onActionClick}
      >
        <EntityTitle
          title={log.action}
          subtitle={
            log.detail ? <div className={styles.detail}>{log.detail}</div> : ''
          }
        />
      </td>
      <td className={styles.tdEdit}>
        <Button
          className={styles.button}
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
