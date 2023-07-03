import React from 'react';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { Lifelog } from '@providers/LifelogProvider';

export interface LifelogDetailDialogProps {
  isOpen: boolean;
  log: Lifelog;
}

const LifelogDetailDialog: React.FC<LifelogDetailDialogProps> = ({
  isOpen,
  log,
}) => {
  return (
    <Dialog isOpen={isOpen}>
      <DialogBody>
        <ul>
          <li>{log.id}</li>
          <li>{log.action}</li>
          <li>{log.detail}</li>
          <li>{log.startedAt}</li>
          <li>{log.finishedAt}</li>
        </ul>
      </DialogBody>
    </Dialog>
  );
};

export default LifelogDetailDialog;
