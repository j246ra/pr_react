import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import lifelogEditDialogValidator from '@validators/lifelogEditDialog';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';
import notify from '@lib/toast';
import useDeleteLifelog from '@src/hooks/useDeleteLifelog';

export type LifelogEditDialogContextType = {
  openEditDialog: (log: Lifelog) => void;
  lifelog: Lifelog;
  editLifelog: (log: Partial<Lifelog>) => void;
  handleUpdateLifelog: () => void;
  handleDeleteLifelog: () => void;
  isOpen: boolean;
  closeEditDialog: () => void;
};

export type Props = {
  children: ReactNode;
};

const LifelogEditDialogContext = createContext(
  {} as LifelogEditDialogContextType
);
export const useLifelogEditDialog = () => useContext(LifelogEditDialogContext);

export default function LifelogEditDialogProvider({ children }: Props) {
  const { newLog, updateLog } = useLifelog();
  const deleteLifelog = useDeleteLifelog();
  const [isOpen, setIsOpen] = useState(false);
  const [lifelog, setLifelog] = useState<Lifelog>(newLog());

  const openEditDialog = (log: Lifelog) => {
    if (isOpen) return;
    setIsOpen(true);
    setLifelog(log);
  };

  const closeEditDialog = () => {
    setIsOpen(false);
  };

  const editLifelog = (log: Partial<Lifelog>) => {
    setLifelog({ ...lifelog, ...log });
  };

  const handleUpdateLifelog = () => {
    if (lifelogEditDialogValidator(lifelog).isInvalid) return;
    updateLog(lifelog, Defs.MESSAGE.ERROR).then(() => {
      notify.success(Defs.MESSAGE.SUCCESS);
      closeEditDialog();
    });
  };

  const handleDeleteLifelog = () => {
    deleteLifelog(lifelog.id);
    closeEditDialog();
  };

  return (
    <LifelogEditDialogContext.Provider
      value={{
        openEditDialog,
        closeEditDialog,
        lifelog,
        editLifelog,
        handleUpdateLifelog,
        handleDeleteLifelog,
        isOpen,
      }}
    >
      {children}
    </LifelogEditDialogContext.Provider>
  );
}
