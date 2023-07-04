import React from 'react';
import { Dialog, DialogBody, HTMLTable } from '@blueprintjs/core';
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
        <HTMLTable style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th style={{ boxShadow: 'none', width: '18%' }}>ID</th>
              <td style={{ boxShadow: 'none' }}>{log.id}</td>
            </tr>
            <tr>
              <th>行動</th>
              <td>{log.action}</td>
            </tr>
            <tr>
              <th>詳細</th>
              <td>{log.detail}</td>
            </tr>
            <tr>
              <th>開始時間</th>
              <td>{log.startedAt}</td>
            </tr>
            <tr>
              <th>終了時間</th>
              <td>{log.finishedAt}</td>
            </tr>
            <tr>
              <th>作成日時</th>
              <td>{log.createdAt}</td>
            </tr>
            <tr>
              <th>更新日時</th>
              <td>{log.updatedAt}</td>
            </tr>
          </tbody>
        </HTMLTable>
      </DialogBody>
    </Dialog>
  );
};

export default LifelogDetailDialog;
