import React from 'react';
import { Button, HTMLTable } from '@blueprintjs/core';
import dayjs from 'dayjs';
import { IconNames } from '@blueprintjs/icons';
import { useLifelog } from '@providers/LifelogApiProvider';
import notify from '@lib/toast';

export interface LifelogListProps {
  logs: {
    id: number;
    action: string;
    detail?: string;
    startedAt: string;
  }[];
}

const LifelogList: React.FC<LifelogListProps> = ({ logs }) => {
  const { lifelogApi: api } = useLifelog();
  const handleDeleteLifelog = (logId: number) => {
    api
      .destroy(logId)
      .then(() => notify.success('削除成功'))
      .catch((e: any) => {
        notify.error(e?.message);
      });
  };

  return (
    <HTMLTable>
      <tbody>
        {logs.map((log, index) => {
          return (
            <tr key={index}>
              <td>{dayjs(log.startedAt).format('YY/MM/DD hh:mm')}</td>
              <td>{log.action}</td>
              <td>{log.detail}</td>
              <td>
                <Button
                  icon={IconNames.DELETE}
                  onClick={() => handleDeleteLifelog(log.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

export default LifelogList;
