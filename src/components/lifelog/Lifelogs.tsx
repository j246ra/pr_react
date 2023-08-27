import React, { FormEvent, useEffect, useState } from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import { useNavigate } from 'react-router-dom';
import ContextInput from '@lifelog/presentational/ContextInput';
import { useLifelog } from '@providers/LifelogProvider';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { LIFELOGS } from '@lib/consts/component';

const Lifelogs: React.FC = () => {
  const { isLogin } = useUser();
  const { createLogByContext } = useLifelog();
  const navigate = useNavigate();
  const [context, setContext] = useState<string>('');

  useEffect(() => {
    if (!isLogin()) {
      notify.error(LIFELOGS.MESSAGE.ERROR);
      return navigate('/login');
    }
  }, [isLogin]);

  const handleCreateLifelog = (e: FormEvent) => {
    e.preventDefault();
    createLogByContext(context)
      .then(() => {
        setContext('');
        notify.success(LIFELOGS.MESSAGE.SUCCESS);
      })
      .catch((e) => notify.error(e.message));
  };

  return (
    <>
      <LifelogDetailDialog />
      <LifelogEditDialog />
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
