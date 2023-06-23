import React, { useEffect, useState } from 'react';
import { Button, HTMLTable } from '@blueprintjs/core';
import dayjs from 'dayjs';
import { IconNames } from '@blueprintjs/icons';
import { useLifelog } from '@providers/LifelogApiProvider';
import notify from '@lib/toast';

export type Lifelog = {
  id: number;
  action: string;
  detail?: string;
  startedAt: string;
};

const LifelogList = () => {
  const { lifelogApi: api } = useLifelog();
  const [logs, setLogs] = useState([] as Lifelog[]);

  useEffect(() => {
    api
      .index()
      .then((r) => {
        setLogs(r.data);
      })
      .catch((e) => {
        notify.error(e.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {logs.map((log) => {
          return (
            <tr key={log.id}>
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
