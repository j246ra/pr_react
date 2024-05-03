import React from 'react';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import BaseLifelogEditDialog from '@lifelog/presentational/BaseLifelogEditDialog';

export default function LifelogEditDialog() {
  const {
    isOpen,
    lifelog,
    editLifelog,
    handleUpdateLifelog,
    handleDeleteLifelog,
    closeEditDialog,
  } = useLifelogEditDialog();

  return (
    <BaseLifelogEditDialog
      lifelog={lifelog}
      editLifelog={editLifelog}
      isOpen={isOpen}
      closeEditDialog={closeEditDialog}
      handleUpdateLifelog={handleUpdateLifelog}
      handleDeleteLifelog={handleDeleteLifelog}
    />
  );
}
