import React from 'react';
import { Dialog, DialogBody, HTMLTable } from '@blueprintjs/core';
import styles from './BaseLifelogDetailDialog.module.scss';
import { LIFELOG_DETAIL_DIALOG } from '@lib/consts/component';
import { LIFELOG_DETAIL_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { LifelogDetailDialogContextType } from '@providers/LifelogDetailDialogProvider';
import { daysDisplayFull } from '@lib/dateUtil';

const LABEL = LIFELOG_DETAIL_DIALOG.LABEL;

export type BaseLifelogDetailDialogProps = Omit<
  LifelogDetailDialogContextType,
  'openDetailDialog'
>;

export default function BaseLifelogDetailDialog({
  isOpen,
  log,
  closeDetailDialog,
}: BaseLifelogDetailDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={closeDetailDialog}>
      <DialogBody>
        <HTMLTable className={styles.base}>
          <tbody data-testid={TEST_ID.TBODY}>
            <tr>
              <th className={styles.trIdTh}>{LABEL.ACTION}</th>
              <td className={styles.trIdTd} data-testid={TEST_ID.TD_ACTION}>
                {log.action}
              </td>
            </tr>
            <tr>
              <th>{LABEL.DETAIL}</th>
              <td data-testid={TEST_ID.TD_DETAIL}>{log.detail}</td>
            </tr>
            <tr>
              <th>{LABEL.STARTED_AT}</th>
              <td data-testid={TEST_ID.TD_STARTED_AT}>
                {daysDisplayFull(log.startedAt)}
              </td>
            </tr>
            <tr>
              <th>{LABEL.FINISHED_AT}</th>
              <td data-testid={TEST_ID.TD_FINISHED_AT}>
                {daysDisplayFull(log.finishedAt)}
              </td>
            </tr>
            <tr>
              <th>{LABEL.CREATED_AT}</th>
              <td data-testid={TEST_ID.TD_CREATED_AT}>
                {daysDisplayFull(log.createdAt)}
              </td>
            </tr>
            <tr>
              <th>{LABEL.UPDATED_AT}</th>
              <td data-testid={TEST_ID.TD_UPDATED_AT}>
                {daysDisplayFull(log.updatedAt)}
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </DialogBody>
    </Dialog>
  );
}
