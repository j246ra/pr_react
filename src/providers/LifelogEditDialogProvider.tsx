import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type LifelogEditDialogContextType = {
  openEditDialog: (log: Lifelog) => void;
  lifelog: Lifelog;
  editLifelog: (log: Partial<Lifelog>) => void;
  isOpen: boolean;
  closeEditDialog: () => void;
};

const LifelogEditDialogContext = createContext(
  {} as LifelogEditDialogContextType
);
export const useLifelogEditDialog = () => useContext(LifelogEditDialogContext);

export const LifelogEditDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { newLog } = useLifelog();
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

  return (
    <LifelogEditDialogContext.Provider
      value={{
        openEditDialog,
        closeEditDialog,
        lifelog,
        editLifelog,
        isOpen,
      }}
    >
      {children}
    </LifelogEditDialogContext.Provider>
  );
};

export default LifelogEditDialogProvider;
