import React from 'react';
import { LifelogListItemProps } from '@lifelog/presentational/LifelogListItem';
import { EntityTitle } from '@blueprintjs/core';
import styles from './LifelogListItem.module.scss';
import useActionTimeDisplay from '@src/hooks/useActionTimeDisplay';
import { LIFELOG_LIST_ITEM_SP_TEST_ID } from '@lib/consts/testId';

type LifelogListItemSpProps = Omit<LifelogListItemProps, 'onActionClick'>;

export function LifelogListItemSp({
  log,
  onEditButtonClick,
}: LifelogListItemSpProps) {
  const { displayDatetime, displayActionTime } = useActionTimeDisplay(log);

  return (
    <tr
      data-testid={LIFELOG_LIST_ITEM_SP_TEST_ID.TR}
      className={styles.trItemSp}
    >
      <td
        data-testid={LIFELOG_LIST_ITEM_SP_TEST_ID.TD + log.id}
        className={log.finishedAt ? styles.bold : ''}
        onClick={onEditButtonClick}
      >
        {displayDatetime + displayActionTime}
        <EntityTitle
          className={styles.action}
          title={log.action}
          subtitle={
            log.detail ? <div className={styles.detail}>{log.detail}</div> : ''
          }
        />
      </td>
    </tr>
  );
}

export default LifelogListItemSp;
