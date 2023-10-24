import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogListItem.module.scss';
import { days, DISPLAY_DATETIME } from '@lib/dateUtil';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';

export type LifelogListItemProps = {
  log: Lifelog;
  onFinishButtonClick: () => void;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
  onActionClick: () => void;
};
const LifelogListItem = ({
  log,
  onFinishButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onActionClick,
}: LifelogListItemProps) => {
  return (
    <tr>
      <td className={`${log.finishedAt ? styles.tdStartedAtBold : ''}`}>
        {days(log.startedAt).format(DISPLAY_DATETIME)}
      </td>
      <td
        data-testid={TEST_ID.LINK_TEXT + log.id}
        className={styles.tdAction}
        onClick={onActionClick}
      >
        {log.action}
      </td>
      <td className={styles.tdDetail}>{log.detail}</td>
      <td className={styles.tdOperation}>
        <Button
          data-testid={TEST_ID.FINISH_BUTTON + log.id}
          intent={Intent.PRIMARY}
          icon={IconNames.STOPWATCH}
          outlined={true}
          onClick={onFinishButtonClick}
        />
        <Button
          className={styles.editButton}
          data-testid={TEST_ID.EDIT_BUTTON + log.id}
          intent={Intent.SUCCESS}
          icon={IconNames.EDIT}
          outlined={true}
          onClick={onEditButtonClick}
        />
        <Button
          className={styles.deleteButton}
          data-testid={TEST_ID.DELETE_BUTTON + log.id}
          intent={Intent.DANGER}
          icon={IconNames.DELETE}
          outlined={true}
          onClick={onDeleteButtonClick}
        />
      </td>
    </tr>
  );
};

export default LifelogListItem;
