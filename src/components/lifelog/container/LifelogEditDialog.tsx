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
import notify from '@lib/toast';
import { IconNames } from '@blueprintjs/icons';
import styles from './LifelogEditDialog.module.scss';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import lifelogEditDialogValidator from '@validators/lifelogEditDialog';

export type LifelogEditDialogProps = {
  detailRows?: number;
};

const LifelogEditDialog = ({ detailRows = 8 }: LifelogEditDialogProps) => {
  const { isOpen, lifelog, editLifelog, updateLifelog, closeEditDialog } =
    useLifelogEditDialog();

  const handleUpdateLifelog = () => {
    if (lifelogEditDialogValidator(lifelog).isInvalid) return;
    updateLifelog(lifelog)
      .then(() => {
        notify.success(Defs.MESSAGE.SUCCESS);
        closeEditDialog();
      })
      .catch((e) => notify.error(e.message));
  };

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
              value={lifelog.detail}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                editLifelog({ detail: e.target.value })
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
            <Button
              data-testid={TEST_ID.BUTTON}
              className={styles.saveButton}
              icon={IconNames.FLOPPY_DISK}
              onClick={handleUpdateLifelog}
              intent={Intent.PRIMARY}
              text={Defs.BUTTON}
            />
          }
        />
      </div>
    </Dialog>
  );
};

export default LifelogEditDialog;
