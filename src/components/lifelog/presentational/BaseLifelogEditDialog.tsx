import React, { ChangeEvent } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import DatetimeInput from '@lifelog/presentational/DatetimeInput';
import { IconNames } from '@blueprintjs/icons';
import styles from './BaseLifelogEditDialog.module.scss';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { LifelogEditDialogContextType } from '@providers/LifelogEditDialogProvider';
import { days, DISPLAY_DATETIME_FULL } from '@lib/dateUtil';
import { doFunctionWhenCmdOrCtrlEnter } from '@lib/keyEventUtil';

export type BaseLifelogEditDialogProps = Pick<
  LifelogEditDialogContextType,
  'isOpen' | 'lifelog' | 'editLifelog' | 'closeEditDialog'
> & {
  detailRows?: number;
  handleUpdateLifelog: () => void;
  handleDeleteLifelog: (id: number) => void;
};

export default function BaseLifelogEditDialog({
  isOpen,
  lifelog,
  editLifelog,
  closeEditDialog,
  detailRows = 8,
  handleUpdateLifelog,
  handleDeleteLifelog,
}: BaseLifelogEditDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={closeEditDialog}>
      <div data-testid={TEST_ID.BASE}>
        <DialogBody>
          <FormGroup label={Defs.ACTION.LABEL}>
            <InputGroup
              placeholder={Defs.ACTION.PLACEHOLDER}
              value={lifelog.action}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                editLifelog({ action: e.target.value })
              }
              required={true}
            />
          </FormGroup>
          <FormGroup label={Defs.DETAIL.LABEL}>
            <TextArea
              placeholder={Defs.DETAIL.PLACEHOLDER}
              fill={true}
              rows={detailRows}
              value={lifelog.detail || undefined}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                editLifelog({ detail: e.target.value })
              }
              onKeyDown={(e) =>
                doFunctionWhenCmdOrCtrlEnter(e, handleUpdateLifelog)
              }
            />
          </FormGroup>
          <DatetimeInput
            label={Defs.STARTED_AT.LABEL}
            placeholder={Defs.STARTED_AT.PLACEHOLDER}
            value={lifelog.startedAt}
            onChange={(newDate: string | null) =>
              editLifelog({ startedAt: newDate || undefined })
            }
          />
          <DatetimeInput
            label={Defs.FINISHED_AT.LABEL}
            placeholder={Defs.FINISHED_AT.PLACEHOLDER}
            value={lifelog.finishedAt || undefined}
            onChange={(newDate: string | null) =>
              editLifelog({
                finishedAt: newDate,
              })
            }
          />
        </DialogBody>
        <DialogFooter
          actions={
            <>
              <Button
                data-testid={TEST_ID.DELETE}
                outlined={true}
                intent={Intent.DANGER}
                icon={IconNames.TRASH}
                text={Defs.BUTTONS.DELETE}
                onClick={() => {
                  handleDeleteLifelog(lifelog.id);
                }}
              />
              <Button
                data-testid={TEST_ID.FINISH}
                outlined={true}
                intent={Intent.PRIMARY}
                text={Defs.BUTTONS.FINISH}
                icon={IconNames.STOPWATCH}
                onClick={() => {
                  editLifelog({
                    finishedAt: days().format(DISPLAY_DATETIME_FULL),
                  });
                }}
              />
              <Button
                data-testid={TEST_ID.SAVE}
                className={styles.saveButton}
                icon={IconNames.FLOPPY_DISK}
                onClick={handleUpdateLifelog}
                intent={Intent.PRIMARY}
                text={Defs.BUTTONS.SAVE}
              />
            </>
          }
        />
      </div>
    </Dialog>
  );
}
