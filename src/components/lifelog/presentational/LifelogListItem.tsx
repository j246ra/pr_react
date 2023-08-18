import React from 'react';
import dayjs from 'dayjs';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogListItem.module.scss';

export interface LifelogListItemProps {
  log: Lifelog;
  onFinishButtonClick: () => void;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
  onActionClick: () => void;
}
const LifelogListItem: React.FC<LifelogListItemProps> = ({
  log,
  onFinishButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onActionClick,
}) => {
  return (
    <tr>
      <td className={`${log.finishedAt ? styles.tdStartedAtBold : ''}`}>
        {dayjs(log.startedAt).format('YY/MM/DD HH:mm')}
      </td>
      <td
        data-testid={`lifelog-item-link-text-${log.id}`}
        className={styles.tdAction}
        onClick={onActionClick}
      >
        {log.action}
      </td>
      <td className={styles.tdDetail}>{log.detail}</td>
      <td className={styles.tdOperation}>
        <Button
          data-testid={`finish-button-${log.id}`}
          intent={Intent.PRIMARY}
          icon={IconNames.STOPWATCH}
          onClick={onFinishButtonClick}
        />
        <Button
          className={styles.editButton}
          data-testid={`edit-button-${log.id}`}
          intent={Intent.SUCCESS}
          icon={IconNames.EDIT}
          onClick={onEditButtonClick}
        />
        <Button
          className={styles.deleteButton}
          data-testid={`delete-button-${log.id}`}
          intent={Intent.DANGER}
          icon={IconNames.DELETE}
          onClick={onDeleteButtonClick}
        />
      </td>
    </tr>
  );
};

export default LifelogListItem;
