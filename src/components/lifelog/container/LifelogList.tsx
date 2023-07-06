import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';

const LifelogList = () => {
  const { logs, loadLogs, deleteLog } = useLifelog();
  const [hasMore, setHasMore] = useState(true);

  const lifelogLoader = (page: number) => {
    loadLogs(page)
      .then((r) => {
        if (r.data.length === 0) setHasMore(false);
      })
      .catch((e) => {
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
    <HTMLTable bordered={false} style={{ width: '100%', margin: '0 auto' }}>
      <LifelogListHeader />
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={hasMore}
        loader={
          <tr key={0}>
            <td colSpan={4} style={{ boxShadow: 'none' }}>
              <Spinner intent={Intent.PRIMARY} size={SpinnerSize.SMALL} />
            </td>
          </tr>
        }
      >
        {logs.map((log) => {
          return (
            <LifelogListItem
              key={log.id}
              log={log}
              onEditButtonClick={() => notify.success('絶賛実装中！！！')}
              onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
            />
          );
        })}
      </InfiniteScroll>
    </HTMLTable>
  );
};

export default LifelogList;
