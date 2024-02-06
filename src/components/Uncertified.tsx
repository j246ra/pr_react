import React, { useEffect } from 'react';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export type UncertifiedProps = {
  component: React.ReactNode;
  redirectTo?: string;
};

function Uncertified({
  component,
  redirectTo = '/lifelogs',
}: UncertifiedProps) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate(redirectTo);
      return;
    }
  }, []);
  if (isLoggedIn()) return;
  return component;
}

export default Uncertified;
