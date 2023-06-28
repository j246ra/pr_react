import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, HTMLTable } from '@blueprintjs/core';
import dayjs from 'dayjs';
import { IconNames } from '@blueprintjs/icons';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';

const LifelogList = () => {
  const { logs, loadLogs, deleteLog } = useLifelog();

  const lifelogLoader = (page: number) => {
    loadLogs(page).catch((e) => {
      notify.error(e.message);
    });
  };
  const handleDeleteLifelog = (logId: number) => {
    deleteLog(logId)
      .then(() => {
        notify.success('削除成功');
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
