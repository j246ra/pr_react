import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';

const LifelogList = () => {
  const { logs, loadLogs, newLog, deleteLog } = useLifelog();
  const [hasMore, setHasMore] = useState(true);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [detailLog, setDetailLog] = useState<undefined | Lifelog>(undefined);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editLog, setEditLog] = useState<Lifelog>(newLog());

  const lifelogLoader = () => {
    loadLogs()
      .then((r) => {
        if (r.data.length === 0) setHasMore(false);
      })
      .catch((e) => {
        notify.error(e.message);
      });
  };

  const handleOpenEditDialog = (lifelog: Lifelog) => {
    setIsEditDialogOpen(true);
    setEditLog(lifelog);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditLog(newLog());
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
    setIsDetailDialogOpen(true);
    setDetailLog(lifelog);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
    setDetailLog(undefined);
  };

  return (
    <div style={{ width: '100%' }}>
      <LifelogDetailDialog
        isOpen={isDetailDialogOpen}
        handleCloseDialog={handleCloseDetailDialog}
        log={detailLog}
      />
      <LifelogEditDialog
        isOpen={isEditDialogOpen}
        handleCloseDialog={handleCloseEditDialog}
        log={editLog}
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
                onEditButtonClick={() => handleOpenEditDialog(log)}
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
