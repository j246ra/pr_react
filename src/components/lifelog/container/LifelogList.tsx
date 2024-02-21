import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, NonIdealState } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';
import useFinishAction from '@src/hooks/useFinishAction';
import styles from './LifelogList.module.scss';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { IconNames } from '@blueprintjs/icons';
import { LIFELOG_LIST } from '@lib/consts/component';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
import LifelogListItemSp from '@lifelog/presentational/LifelogListItemSp';

export default function LifelogList() {
  const { lifelogs, loadLogs, isTerminated } = useLifelog();
  const { openDetailDialog } = useLifelogDetailDialog();
  const { openEditDialog } = useLifelogEditDialog();
  const handleFinishLifelog = useFinishAction();
  const handleDeleteLifelog = useDeleteLifelog();
  const isSp = useMediaQuery(mediaQuery.sp);

  const lifelogLoader = async () => {
    const res = await loadLogs(LIFELOG_LIST.MESSAGE.ERROR);
    if (res.data?.invalidData.length > 0) {
      notify.error(LIFELOG_LIST.MESSAGE.INVALID_DATA);
    }
  };

  return (
    <HTMLTable className={styles.baseTable} bordered={false} interactive={true}>
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={!isTerminated}
        loader={LifelogListLoader()}
      >
        {lifelogs.length === 0 && isTerminated ? (
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
          lifelogs.map((log) => {
            if (isSp) {
              return (
                <LifelogListItemSp
                  key={log.id}
                  log={log}
                  onActionClick={() => openDetailDialog(log)}
                  onEditButtonClick={() => openEditDialog(log)}
                  onFinishButtonClick={() => handleFinishLifelog(log)}
                  onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
                />
              );
            } else {
              return (
                <LifelogListItem
                  key={log.id}
                  log={log}
                  onActionClick={() => openDetailDialog(log)}
                  onEditButtonClick={() => openEditDialog(log)}
                  onFinishButtonClick={() => handleFinishLifelog(log)}
                  onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
                />
              );
            }
          })
        )}
      </InfiniteScroll>
    </HTMLTable>
  );
}
