import React from 'react';
import LifelogListItem from '@lifelog/presentational/LifelogListItem';
import LifelogListItemSp from '@lifelog/presentational/LifelogListItemSp';
import useMediaQuery, { mediaQuery } from '@src/hooks/useMediaQuery';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import { Lifelog } from '@providers/LifelogProvider';

type LifelogListItemContainerProps = {
  lifelogs: Lifelog[];
};

export default function LifelogListItemResponsive({
  lifelogs,
}: LifelogListItemContainerProps) {
  const { openEditDialog } = useLifelogEditDialog();
  const { openDetailDialog } = useLifelogDetailDialog();
  const isSp = useMediaQuery(mediaQuery.sp);

  return (
    <>
      {lifelogs.map((log) => {
        if (isSp) {
          return (
            <LifelogListItemSp
              key={log.id}
              log={log}
              onEditButtonClick={() => openEditDialog(log)}
            />
          );
        }
        return (
          <LifelogListItem
            key={log.id}
            log={log}
            onActionClick={() => openDetailDialog(log)}
            onEditButtonClick={() => openEditDialog(log)}
          />
        );
      })}
    </>
  );
}
