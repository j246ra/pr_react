import React, { useEffect } from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import { useNavigate } from 'react-router-dom';

const Lifelogs: React.FC = () => {
  const { isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      notify.error('ログインしてください。');
      return navigate('/login');
    }
  }, [isLogin]);

  return <LifelogList />;
};

export default Lifelogs;
