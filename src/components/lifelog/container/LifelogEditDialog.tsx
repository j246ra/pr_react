import React from 'react';
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
import { Lifelog } from '@providers/LifelogProvider';

export interface LifelogEditDialogProps {
  isOpen: boolean;
  log: Lifelog;
}

const LifelogEditDialog: React.FC<LifelogEditDialogProps> = ({
  isOpen,
  log,
}) => {
  return (
    <Dialog isOpen={isOpen}>
      <DialogBody>
        <FormGroup label={'行動内容'} labelFor={'lifelog-edit-action'}>
          <InputGroup
            id={'lifelog-edit-action'}
            placeholder={'行動内容を入力してください。'}
            value={log.action}
          />
        </FormGroup>
        <FormGroup label={'詳細'} labelFor={'lifelog-edit-detail'}>
          <TextArea
            placeholder={'詳細を入力してください。'}
            fill={true}
            rows={5}
            value={log.detail}
          />
        </FormGroup>
        <FormGroup label={'開始時間'} labelFor={'lifelog-edit-started-at'}>
          <InputGroup
            id={'lifelog-edit-started-at'}
            placeholder={'開始日時'}
            value={log.startedAt}
          />
        </FormGroup>
        <FormGroup label={'終了時間'} labelFor={'lifelog-edit-finished-at'}>
          <InputGroup
            id={'lifelog-edit-finished-at'}
            placeholder={'終了日時'}
            value={log.finishedAt}
          />
        </FormGroup>
      </DialogBody>
      <DialogFooter
        actions={<Button intent={Intent.PRIMARY} text={'保存'} />}
      />
    </Dialog>
  );
};

export default LifelogEditDialog;
