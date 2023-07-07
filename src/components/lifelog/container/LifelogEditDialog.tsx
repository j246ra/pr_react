import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import DatetimeInput from '@lifelog/presentational/DatetimeInput';
import notify from '@lib/toast';
import { IconNames } from '@blueprintjs/icons';

export interface LifelogEditDialogProps {
  isOpen: boolean;
  handleCloseDialog: () => void;
  log: Lifelog;
  detailRows?: number;
}

const LifelogEditDialog: React.FC<LifelogEditDialogProps> = ({
  isOpen,
  handleCloseDialog,
  log,
  detailRows = 8,
}) => {
  const { updateLog } = useLifelog();
  const [lifelog, setLifelog] = useState(log);

  useEffect(() => {
    setLifelog(log);
  }, [log]);

  const handleUpdateLifelog = () => {
    updateLog(lifelog)
      .then(() => {
        notify.success('行動を保存しました。');
        handleCloseDialog();
      })
      .catch((e) => notify.error(e.message));
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
      <DialogBody>
        <FormGroup label={'行動内容'} labelFor={'lifelog-edit-action'}>
          <InputGroup
            id={'lifelog-edit-action'}
            placeholder={'行動内容を入力してください。'}
            value={lifelog.action}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLifelog({ ...lifelog, action: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup label={'詳細'} labelFor={'lifelog-edit-detail'}>
          <TextArea
            placeholder={'詳細を入力してください。'}
            fill={true}
            rows={detailRows}
            value={lifelog.detail}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setLifelog({ ...lifelog, detail: e.target.value })
            }
          />
        </FormGroup>
        <DatetimeInput
          label={'開始日時'}
          placeholder={'開始日時'}
          value={lifelog.startedAt}
          onChange={(newDate: string | null) =>
            setLifelog({ ...lifelog, startedAt: newDate ? newDate : '' })
          }
        />
        <DatetimeInput
          label={'終了日時'}
          placeholder={'終了日時'}
          value={lifelog.finishedAt}
          onChange={(newDate: string | null) =>
            setLifelog({
              ...lifelog,
              finishedAt: newDate ? newDate : undefined,
            })
          }
        />
      </DialogBody>
      <DialogFooter
        actions={
          <Button
            style={{ minWidth: '80px', letterSpacing: '0.25em' }}
            icon={IconNames.FloppyDisk}
            onClick={handleUpdateLifelog}
            intent={Intent.PRIMARY}
            text={'保存'}
          />
        }
      />
    </Dialog>
  );
};

export default LifelogEditDialog;
