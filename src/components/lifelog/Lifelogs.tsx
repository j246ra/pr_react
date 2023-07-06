import React, { useEffect } from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import { useNavigate } from 'react-router-dom';
import ContextInput from '@lifelog/presentational/ContextInput';

const Lifelogs: React.FC = () => {
  const { isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      notify.error('ログインしてください。');
      return navigate('/login');
    }
  }, [isLogin]);

  return (
    <>
      <ContextInput
        onSubmit={() => notify.success('絶賛実装中')}
        onChange={() => notify.success('絶賛実装中')}
      />
      <LifelogList />
    </>
  );
};

export default Lifelogs;
