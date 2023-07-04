import React from 'react';
import dayjs from 'dayjs';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';

export interface LifelogListItemProps {
  log: Lifelog;
  onDeleteButtonClick: () => void;
  onEditButtonClick: () => void;
}
const LifelogListItem: React.FC<LifelogListItemProps> = ({
  log,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <tr>
      <td style={{ width: '150px' }}>
        {dayjs(log.startedAt).format('YY/MM/DD HH:mm')}
      </td>
      <td>{log.action}</td>
      <td>{log.detail}</td>
      <td style={{ width: '150px', textAlign: 'center' }}>
        <Button
          intent={Intent.SUCCESS}
          icon={IconNames.EDIT}
          onClick={onEditButtonClick}
        />
        <Button
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
