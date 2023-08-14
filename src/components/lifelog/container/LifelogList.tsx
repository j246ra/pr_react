import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import {
  Lifelog,
  useLifelog,
  useLifelogDetailDialog,
  useLifelogEditDialog,
} from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';

const LifelogList = () => {
  const { logs, loadLogs, finishLog, deleteLog } = useLifelog();
  const { openDetailDialog: handleOpenDetailDialog } = useLifelogDetailDialog();
  const { openEditDialog: handleOpenEditDialog } = useLifelogEditDialog();
  const [hasMore, setHasMore] = useState(true);

  const lifelogLoader = () => {
    loadLogs()
      .then((r) => {
        if (r.data.length === 0) setHasMore(false);
      })
      .catch((e) => {
        notify.error(e.message);
      });
  };

  const handleFinishLifelog = (lifelog: Lifelog) => {
    finishLog(lifelog).then(() => notify.success('行動時間を記録しました。'));
  };

  const handleDeleteLifelog = (logId: number) => {
    if (!confirm('本当に削除しますか？')) return;
    deleteLog(logId)
      .then(() => {
        notify.success('削除成功');
      })
      .catch((e) => {
        notify.error(e?.message);
      });
  };

  return (
    <>
      <HTMLTable bordered={false} style={{ width: '100%' }}>
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
                onFinishButtonClick={() => handleFinishLifelog(log)}
                onEditButtonClick={() => handleOpenEditDialog(log)}
                onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
                onActionClick={() => handleOpenDetailDialog(log)}
              />
            );
          })}
        </InfiniteScroll>
      </HTMLTable>
    </>
  );
};

export default LifelogList;
