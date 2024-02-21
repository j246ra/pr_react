import React from 'react';
import notify from '@lib/toast';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import lifelogEditDialogValidator from '@validators/lifelogEditDialog';
import BaseLifelogEditDialog from '@lifelog/presentational/BaseLifelogEditDialog';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';

export default function LifelogEditDialog() {
  const { isOpen, lifelog, editLifelog, updateLifelog, closeEditDialog } =
    useLifelogEditDialog();

  const deleteLifelog = useDeleteLifelog();

  const handleUpdateLifelog = () => {
    if (lifelogEditDialogValidator(lifelog).isInvalid) return;
    updateLifelog(lifelog, Defs.MESSAGE.ERROR).then(() => {
      notify.success(Defs.MESSAGE.SUCCESS);
      closeEditDialog();
    });
  };

  const handleDeleteLifelog = (id: number) => {
    deleteLifelog(id);
    closeEditDialog();
  };

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
