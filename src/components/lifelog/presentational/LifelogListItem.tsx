import React from 'react';
import dayjs from 'dayjs';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';

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
      <td style={{ fontWeight: log.finishedAt ? 'bold' : 'normal' }}>
        {dayjs(log.startedAt).format('YY/MM/DD HH:mm')}
      </td>
      <td className={'app-link-text'} onClick={onActionClick}>
        {log.action}
      </td>
      <td>{log.detail}</td>
      <td style={{ textAlign: 'center' }}>
        <Button
          data-testid="finish-button"
          intent={Intent.PRIMARY}
          icon={IconNames.STOPWATCH}
          onClick={onFinishButtonClick}
        />
        <Button
          data-testid="edit-button"
          intent={Intent.SUCCESS}
          style={{ marginLeft: '3px' }}
          icon={IconNames.EDIT}
          onClick={onEditButtonClick}
        />
        <Button
          data-testid="delete-button"
          intent={Intent.DANGER}
          style={{ marginLeft: '3px' }}
          icon={IconNames.DELETE}
          onClick={onDeleteButtonClick}
        />
      </td>
    </tr>
  );
};

export default LifelogListItem;
