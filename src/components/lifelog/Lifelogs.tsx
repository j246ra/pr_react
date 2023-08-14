import React, { FormEvent, useEffect, useState } from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import { useNavigate } from 'react-router-dom';
import ContextInput from '@lifelog/presentational/ContextInput';
import {
  useLifelog,
  useLifelogDetailDialog,
  useLifelogEditDialog,
} from '@providers/LifelogProvider';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';

const Lifelogs: React.FC = () => {
  const { isLogin } = useUser();
  const { createLogByContext } = useLifelog();
  const { detailDialogProps } = useLifelogDetailDialog();
  const { editDialogProps } = useLifelogEditDialog();
  const navigate = useNavigate();
  const [context, setContext] = useState<string>('');

  useEffect(() => {
    if (!isLogin()) {
      notify.error('ログインしてください。');
      return navigate('/login');
    }
  }, [isLogin]);

  const handleCreateLifelog = (e: FormEvent) => {
    e.preventDefault();
    createLogByContext(context)
      .then(() => {
        setContext('');
        notify.success('行動を記録しました。');
      })
      .catch((e) => notify.error(e.message));
  };

  return (
    <>
      <LifelogDetailDialog {...detailDialogProps} />
      <LifelogEditDialog {...editDialogProps} />
      <ContextInput
        onSubmit={handleCreateLifelog}
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <LifelogList />
    </>
  );
};

export default Lifelogs;
