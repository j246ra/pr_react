import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, NonIdealState } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import styles from './LifelogList.module.scss';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { IconNames } from '@blueprintjs/icons';
import { LIFELOG_LIST } from '@lib/consts/component';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
import LifelogListItemSp from '@lifelog/presentational/LifelogListItemSp';
import { LIFELOG_LIST_TEST_ID } from '@lib/consts/testId';

export default function LifelogList() {
  const { lifelogs, loadLogs, isTerminated } = useLifelog();
  const { openDetailDialog } = useLifelogDetailDialog();
  const { openEditDialog } = useLifelogEditDialog();
  const isSp = useMediaQuery(mediaQuery.sp);

  const lifelogLoader = async () => {
    const res = await loadLogs(LIFELOG_LIST.MESSAGE.ERROR);
    if (res.data?.invalidData.length > 0) {
      notify.error(LIFELOG_LIST.MESSAGE.INVALID_DATA);
    }
  };

  return lifelogs.length === 0 && isTerminated ? (
    <NonIdealState
      icon={IconNames.EDIT}
      description={
        <div data-testid={LIFELOG_LIST_TEST_ID.NON_IDEA_STATE}>
          ライフログが１件も記録されていませんね。
          <br />
          どんどん行動を記録していきましょう！！
        </div>
      }
    />
  ) : (
    <HTMLTable className={styles.baseTable} bordered={false} interactive={true}>
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={!isTerminated}
        loader={LifelogListLoader()}
      >
        {lifelogs.map((log) => {
          if (isSp) {
            return (
              <LifelogListItemSp
                key={log.id}
                log={log}
                onEditButtonClick={() => openEditDialog(log)}
              />
            );
          } else {
            return (
              <LifelogListItem
                key={log.id}
                log={log}
                onActionClick={() => openDetailDialog(log)}
                onEditButtonClick={() => openEditDialog(log)}
              />
            );
          }
        })}
      </InfiniteScroll>
    </HTMLTable>
  );
}
