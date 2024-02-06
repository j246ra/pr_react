import React, { useEffect } from 'react';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { COMMON } from '@lib/consts/common';

export type UncertifiedProps = {
  component: React.ReactNode;
  redirectTo?: string;
};

function Uncertified({
  component,
  redirectTo = COMMON.REDIRECT_TO.UNCERTIFIED,
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
