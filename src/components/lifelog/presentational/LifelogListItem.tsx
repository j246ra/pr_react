import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Lifelog } from '@providers/LifelogProvider';

export interface LifelogListItemProps {
  log: Lifelog;
  onDeleteButtonClick: () => void;
}
const LifelogListItem: React.FC<LifelogListItemProps> = ({
  log,
  onDeleteButtonClick,
}) => {
  return (
    <tr>
      <td style={{ width: '150px' }}>
        {dayjs(log.startedAt).format('YY/MM/DD HH:mm')}
      </td>
      <td>{log.action}</td>
      <td>{log.detail}</td>
      <td align={'center'} style={{ width: '150px' }}>
        <Button icon={IconNames.DELETE} onClick={onDeleteButtonClick} />
      </td>
    </tr>
  );
};

export default LifelogListItem;
