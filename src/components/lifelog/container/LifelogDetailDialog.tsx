import React from 'react';
import { Dialog, DialogBody, HTMLTable } from '@blueprintjs/core';
import { Lifelog } from '@providers/LifelogProvider';

export interface LifelogDetailDialogProps {
  isOpen: boolean;
  handleCloseDialog: () => void;
  log?: Lifelog;
}

export const LIFELOG_DETAIL_DIALOG_TEST_ID = 'lifelog-detail-dialog';
const TEST_ID = LIFELOG_DETAIL_DIALOG_TEST_ID + '-';

const LifelogDetailDialog: React.FC<LifelogDetailDialogProps> = ({
  isOpen,
  handleCloseDialog,
  log,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
      <DialogBody>
        <HTMLTable style={{ width: '100%', whiteSpace: 'pre-line' }}>
          <tbody data-testid={`${TEST_ID}tbody`}>
            <tr>
              <th style={{ boxShadow: 'none', width: '18%' }}>ID</th>
              <td style={{ boxShadow: 'none' }}>{log?.id}</td>
            </tr>
            <tr>
              <th>行動</th>
              <td data-testid={`${TEST_ID}td-action`}>{log?.action}</td>
            </tr>
            <tr>
              <th>詳細</th>
              <td data-testid={`${TEST_ID}td-detail`}>{log?.detail}</td>
            </tr>
            <tr>
              <th>開始時間</th>
              <td data-testid={`${TEST_ID}td-started-at`}>{log?.startedAt}</td>
            </tr>
            <tr>
              <th>終了時間</th>
              <td data-testid={`${TEST_ID}td-finished-at`}>
                {log?.finishedAt}
              </td>
            </tr>
            <tr>
              <th>作成日時</th>
              <td data-testid={`${TEST_ID}td-created-at`}>{log?.createdAt}</td>
            </tr>
            <tr>
              <th>更新日時</th>
              <td data-testid={`${TEST_ID}td-updated-at`}>{log?.updatedAt}</td>
            </tr>
          </tbody>
        </HTMLTable>
      </DialogBody>
    </Dialog>
  );
};

export default LifelogDetailDialog;
