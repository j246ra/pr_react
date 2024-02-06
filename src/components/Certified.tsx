import React, { useEffect } from 'react';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import notify from '@lib/toast';
import { CERTIFIED } from '@lib/consts/component';

export type CertifiedProps = {
  component: React.ReactNode;
  redirectTo?: string;
};

function Certified({ component, redirectTo = '/login' }: CertifiedProps) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      notify.error(CERTIFIED.ERROR);
      navigate(redirectTo);
      return;
    }
  }, []);
  if (!isLoggedIn()) return;
  return component;
}

export default Certified;
