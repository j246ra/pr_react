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
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      notify.error(LIFELOGS.MESSAGE.ERROR);
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {isLoggedIn() ? (
        <>
          <LifelogDetailDialog />
          <LifelogEditDialog />
          <ContextInput />
          <LifelogList />
        </>
      ) : null}
    </>
  );
};

export default Lifelogs;
