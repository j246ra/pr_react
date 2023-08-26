import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LifelogDetailDialogProps } from '@lifelog/container/LifelogDetailDialog';
import { Lifelog } from '@providers/LifelogProvider';

type LifelogDetailDialogContextType = {
  openDetailDialog: (log: Lifelog) => void;
  detailDialogProps: LifelogDetailDialogProps;
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
  const [detailLog, setDetailLog] = useState<Lifelog>();

  const openDetailDialog = (log: Lifelog) => {
    if (isOpenDetailDialog) return;
    setIsOpenDetailDialog(true);
    setDetailLog(log);
  };

  const closeDetailDialog = () => {
    setIsOpenDetailDialog(false);
  };

  const detailDialogProps: LifelogDetailDialogProps = {
    log: detailLog,
    isOpen: isOpenDetailDialog,
    handleCloseDialog: closeDetailDialog,
  };

  return (
    <LifelogDetailDialogContext.Provider
      value={{ openDetailDialog, detailDialogProps }}
    >
      {children}
    </LifelogDetailDialogContext.Provider>
  );
};

export default LifelogDetailDialogProvider;
