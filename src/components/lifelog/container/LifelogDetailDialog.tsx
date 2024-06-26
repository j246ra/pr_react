import React from 'react';
import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import BaseLifelogDetailDialog from '@lifelog/presentational/BaseLifelogDetailDialog';

export default function LifelogDetailDialog() {
  const { isOpen, log, closeDetailDialog } = useLifelogDetailDialog();
  return (
    <BaseLifelogDetailDialog
      closeDetailDialog={closeDetailDialog}
      isOpen={isOpen}
      log={log}
    />
  );
}
