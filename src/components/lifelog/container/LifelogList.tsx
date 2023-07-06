import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';

const LifelogList = () => {
  const { logs, loadLogs, deleteLog } = useLifelog();
  const [hasMore, setHasMore] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [detailLog, setDetailLog] = useState<undefined | Lifelog>(undefined);

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

  const handleOpenDetailDialog = (lifelog: Lifelog) => {
    setIsOpen(true);
    setDetailLog(lifelog);
  };

  const handleCloseDetailDialog = () => {
    setIsOpen(false);
    setDetailLog(undefined);
  };

  return (
    <div style={{ width: '100%' }}>
      <LifelogDetailDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDetailDialog}
        log={detailLog}
      />
      <HTMLTable bordered={false}>
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
                onActionClick={() => handleOpenDetailDialog(log)}
              />
            );
          })}
        </InfiniteScroll>
      </HTMLTable>
    </div>
  );
};

export default LifelogList;
