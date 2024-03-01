import React, { useId } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, NonIdealState } from '@blueprintjs/core';
import styles from './LifelogList.module.scss';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { IconNames } from '@blueprintjs/icons';
import { LIFELOG_LIST_TEST_ID } from '@lib/consts/testId';
import useLifelogList from '@src/hooks/useLifelogList';
import LifelogListItemResponsive from '@lifelog/container/LifelogListItemResponsive';

export default function LifelogList() {
  const { lifelogs, lifelogLoader, hasMore } = useLifelogList();
  const loaderKey = useId();

  return hasMore ? (
    <HTMLTable className={styles.baseTable} bordered={false} interactive={true}>
      <InfiniteScroll
        element={'tbody'}
        loadMore={lifelogLoader}
        hasMore={hasMore}
        loader={<LifelogListLoader key={loaderKey} />}
      >
        <LifelogListItemResponsive lifelogs={lifelogs} />
      </InfiniteScroll>
    </HTMLTable>
  ) : (
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
  );
}
