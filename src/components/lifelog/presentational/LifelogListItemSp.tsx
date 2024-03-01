import React, { useMemo } from 'react';
import { LifelogListItemProps } from '@lifelog/presentational/LifelogListItem';
import { EntityTitle } from '@blueprintjs/core';
import styles from './LifelogListItem.module.scss';
import useActionTimeDisplay from '@src/hooks/useActionTimeDisplay';
import { truncate } from '@lib/stringUtil';
import { LIFELOG_LIST_ITEM_SP as Defs } from '@lib/consts/component';
import { LIFELOG_LIST_ITEM_SP_TEST_ID } from '@lib/consts/testId';

type LifelogListItemSpProps = Omit<LifelogListItemProps, 'onActionClick'>;

export function LifelogListItemSp({
  log,
  onEditButtonClick,
}: LifelogListItemSpProps) {
  const { displayDatetime, displayActionTime } = useActionTimeDisplay(log);
  const detail = useMemo(
    () => truncate(log.detail, Defs.DETAIL_TRUNCATE_LENGTH),
    [log.detail]
  );

  return (
    <tr
      data-testid={LIFELOG_LIST_ITEM_SP_TEST_ID.TR}
      className={styles.trItemSp}
    >
      <td
        className={log.finishedAt ? styles.bold : ''}
        onClick={onEditButtonClick}
      >
        {displayDatetime + displayActionTime}
        <EntityTitle
          className={styles.action}
          title={log.action}
          subtitle={detail || ''}
        />
      </td>
    </tr>
  );
}

export default LifelogListItemSp;
