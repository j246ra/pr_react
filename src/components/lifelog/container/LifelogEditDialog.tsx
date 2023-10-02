import React from 'react';
import notify from '@lib/toast';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import lifelogEditDialogValidator from '@validators/lifelogEditDialog';
import BaseLifelogEditDialog from '@lifelog/presentational/BaseLifelogEditDialog';

const LifelogEditDialog = () => {
  const { isOpen, lifelog, editLifelog, updateLifelog, closeEditDialog } =
    useLifelogEditDialog();

  const handleUpdateLifelog = () => {
    if (lifelogEditDialogValidator(lifelog).isInvalid) return;
    updateLifelog(lifelog)
      .then(() => {
        notify.success(Defs.MESSAGE.SUCCESS);
        closeEditDialog();
      })
      .catch((e) => notify.error(e.message));
  };

  return (
    <BaseLifelogEditDialog
      lifelog={lifelog}
      editLifelog={editLifelog}
      isOpen={isOpen}
      closeEditDialog={closeEditDialog}
      handleUpdateLifelog={handleUpdateLifelog}
    />
  );
};

export default LifelogEditDialog;
