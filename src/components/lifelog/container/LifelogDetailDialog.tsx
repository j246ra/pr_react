import React from 'react';
import { Dialog, DialogBody, HTMLTable } from '@blueprintjs/core';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogDetailDialog.module.scss';

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
        <HTMLTable className={styles.base}>
          <tbody data-testid={`${TEST_ID}tbody`}>
            <tr>
              <th className={styles.trIdTh}>ID</th>
              <td className={styles.trIdTd}>{log?.id}</td>
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
