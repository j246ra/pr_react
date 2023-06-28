import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
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

  const lifelogLoader = (page: number) => {
    api
      .index(page)
      .then((r) => {
        setLogs([...logs, ...r.data]);
      })
      .catch((e) => {
        notify.error(e.message);
      });
  };
  const handleDeleteLifelog = (logId: number) => {
    api
      .destroy(logId)
      .then(() => {
        notify.success('削除成功');
        setLogs(
          logs.filter((log) => {
            if (log.id !== logId) return log;
          })
        );
      })
      .catch((e) => {
        notify.error(e?.message);
      });
  };

  return (
    <HTMLTable>
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={true}
        loader={
          <tr key={0}>
            <td>Loading ...</td>
          </tr>
        }
      >
        {logs.map((log) => {
          return (
            <tr key={log.id}>
              <td>{dayjs(log.startedAt).format('YY/MM/DD HH:mm')}</td>
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
      </InfiniteScroll>
    </HTMLTable>
  );
};

export default LifelogList;
