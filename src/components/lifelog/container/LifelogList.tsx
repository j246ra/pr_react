import React, { useId } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, NonIdealState } from '@blueprintjs/core';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import styles from './LifelogList.module.scss';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { IconNames } from '@blueprintjs/icons';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
import LifelogListItemSp from '@lifelog/presentational/LifelogListItemSp';
import { LIFELOG_LIST_TEST_ID } from '@lib/consts/testId';
import useLifelogList from '@src/hooks/useLifelogList';

export default function LifelogList() {
  const { lifelogs, lifelogLoader, hasMore } = useLifelogList();
  const { openDetailDialog } = useLifelogDetailDialog();
  const { openEditDialog } = useLifelogEditDialog();
  const isSp = useMediaQuery(mediaQuery.sp);

  return !hasMore ? (
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
        hasMore={hasMore}
        loader={<LifelogListLoader key={useId()} />}
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
