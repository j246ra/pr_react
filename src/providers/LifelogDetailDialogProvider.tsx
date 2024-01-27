import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Lifelog } from '@providers/LifelogProvider';
import lifelogUtil from '@lib/lifelogUtil';

export type LifelogDetailDialogContextType = {
  openDetailDialog: (log: Lifelog) => void;
  closeDetailDialog: () => void;
  isOpen: boolean;
  log: Lifelog;
};

const LifelogDetailDialogContext = createContext(
  {} as LifelogDetailDialogContextType
);

export const useLifelogDetailDialog = () =>
  useContext(LifelogDetailDialogContext);

type LifelogDetailDialogProvider = {
  children: ReactNode;
};
export const LifelogDetailDialogProvider = ({
  children,
}: LifelogDetailDialogProvider) => {
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);
  const [detailLog, setDetailLog] = useState<Lifelog>(lifelogUtil.blank());

  const openDetailDialog = (log: Lifelog) => {
    if (isOpenDetailDialog) return;
    setIsOpenDetailDialog(true);
    setDetailLog(log);
  };

  const closeDetailDialog = () => {
    setIsOpenDetailDialog(false);
  };

  return (
    <LifelogDetailDialogContext.Provider
      value={{
        openDetailDialog,
        closeDetailDialog,
        isOpen: isOpenDetailDialog,
        log: detailLog,
      }}
    >
      {children}
    </LifelogDetailDialogContext.Provider>
  );
};

export default LifelogDetailDialogProvider;
