import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, NonIdealState } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';
import useFinishAction from '@src/hooks/useFinishAction';
import styles from './LifelogList.module.scss';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { IconNames } from '@blueprintjs/icons';

const LifelogList = () => {
  const { logs, loadLogs } = useLifelog();
  const { openDetailDialog } = useLifelogDetailDialog();
  const { openEditDialog } = useLifelogEditDialog();
  const handleFinishLifelog = useFinishAction();
  const handleDeleteLifelog = useDeleteLifelog();
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

  return (
    <HTMLTable className={styles.baseTable} bordered={false}>
      <LifelogListHeader enabled={logs.length > 0} />
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={hasMore}
        loader={LifelogListLoader()}
      >
        {logs.length === 0 && !hasMore ? (
          <NonIdealState
            icon={IconNames.EDIT}
            description={
              <div>
                ライフログが１件も記録されていませんね。
                <br />
                どんどん行動を記録していきましょう！！
              </div>
            }
          />
        ) : (
          logs.map((log) => (
            <LifelogListItem
              key={log.id}
              log={log}
              onActionClick={() => openDetailDialog(log)}
              onEditButtonClick={() => openEditDialog(log)}
              onFinishButtonClick={() => handleFinishLifelog(log)}
              onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
            />
          ))
        )}
      </InfiniteScroll>
    </HTMLTable>
  );
};

export default LifelogList;
