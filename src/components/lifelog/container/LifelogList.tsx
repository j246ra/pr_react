import React from 'react';
import { HTMLTable } from '@blueprintjs/core';
import dayjs from 'dayjs';

export interface LifelogListProps {
  logs: {
    action: string;
    detail?: string;
    startedAt: string;
  }[];
}

const LifelogList: React.FC<LifelogListProps> = ({ logs }) => {
  return (
    <HTMLTable>
      <tbody>
        {logs.map((log, index) => {
          return (
            <tr key={index}>
              <td>{dayjs(log.startedAt).format('YY/MM/DD hh:mm')}</td>
              <td>{log.action}</td>
              <td>{log.detail}</td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

export default LifelogList;
