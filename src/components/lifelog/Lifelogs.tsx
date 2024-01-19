import React, { useEffect } from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import { useNavigate } from 'react-router-dom';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { LIFELOGS } from '@lib/consts/component';
import ContextInput from '@lifelog/container/ContextInput';

const Lifelogs: React.FC = () => {
  const { isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      notify.error(LIFELOGS.MESSAGE.ERROR);
      return navigate('/login');
    }
  }, [isLogin]);

  return (
    <>
      <LifelogDetailDialog />
      <LifelogEditDialog />
      <ContextInput />
      <LifelogList />
    </>
  );
};

export default Lifelogs;
