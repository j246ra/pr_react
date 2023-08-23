import React from 'react';
import { Dialog, DialogBody, HTMLTable } from '@blueprintjs/core';
import { Lifelog } from '@providers/LifelogProvider';
import styles from './LifelogDetailDialog.module.scss';
import { LIFELOG_DETAIL_DIALOG } from '@lib/consts';
import { LIFELOG_DETAIL_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';

export interface LifelogDetailDialogProps {
  isOpen: boolean;
  handleCloseDialog: () => void;
  log?: Lifelog;
}

const LABEL = LIFELOG_DETAIL_DIALOG.LABEL;

const LifelogDetailDialog = ({
  isOpen,
  handleCloseDialog,
  log,
}: LifelogDetailDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
      <DialogBody>
        <HTMLTable className={styles.base}>
          <tbody data-testid={TEST_ID.TBODY}>
            <tr>
              <th className={styles.trIdTh}>ID</th>
              <td className={styles.trIdTd}>{log?.id}</td>
            </tr>
            <tr>
              <th>{LABEL.ACTION}</th>
              <td data-testid={TEST_ID.TD_ACTION}>{log?.action}</td>
            </tr>
            <tr>
              <th>{LABEL.DETAIL}</th>
              <td data-testid={TEST_ID.TD_DETAIL}>{log?.detail}</td>
            </tr>
            <tr>
              <th>{LABEL.STARTED_AT}</th>
              <td data-testid={TEST_ID.TD_STARTED_AT}>{log?.startedAt}</td>
            </tr>
            <tr>
              <th>{LABEL.FINISHED_AT}</th>
              <td data-testid={TEST_ID.TD_FINISHED_AT}>{log?.finishedAt}</td>
            </tr>
            <tr>
              <th>{LABEL.CREATED_AT}</th>
              <td data-testid={TEST_ID.TD_CREATED_AT}>{log?.createdAt}</td>
            </tr>
            <tr>
              <th>{LABEL.UPDATED_AT}</th>
              <td data-testid={TEST_ID.TD_UPDATED_AT}>{log?.updatedAt}</td>
            </tr>
          </tbody>
        </HTMLTable>
      </DialogBody>
    </Dialog>
  );
};

export default LifelogDetailDialog;
