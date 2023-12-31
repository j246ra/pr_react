import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HTMLTable, Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListHeader from '@lifelog/presentational/LifelogListHeader';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';
import useFinishAction from '@src/hooks/useFinishAction';
import styles from './LifelogList.module.scss';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import { LIFELOG_LIST_TEST_ID as TEST_ID } from '@lib/consts/testId';

const LifelogList = () => {
  const { logs, loadLogs } = useLifelog();
  const { openDetailDialog } = useLifelogDetailDialog();
  const handleDeleteLifelog = useDeleteLifelog();
  const handleFinishLifelog = useFinishAction();
  const { openEditDialog } = useLifelogEditDialog();
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
    <>
      <HTMLTable className={styles.baseTable} bordered={false}>
        <LifelogListHeader enabled={logs.length > 0} />
        <InfiniteScroll
          element={'tbody'}
          loadMore={lifelogLoader}
          hasMore={hasMore}
          loader={
            <tr data-testid={TEST_ID.SPINNER} key={0}>
              <td className={styles.spinnerTd} colSpan={4}>
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
                onEditButtonClick={() => openEditDialog(log)}
                onDeleteButtonClick={() => handleDeleteLifelog(log.id)}
                onActionClick={() => openDetailDialog(log)}
              />
            );
          })}
        </InfiniteScroll>
      </HTMLTable>
    </>
  );
};

export default LifelogList;
