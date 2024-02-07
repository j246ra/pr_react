import React, { useEffect } from 'react';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import notify from '@lib/toast';

export type AuthGateProps = {
  children: React.ReactNode;
  passingCondition: (isLoggedIn: boolean) => boolean;
  fallbackPath: string;
  fallbackMessage?: string;
};

export type UnauthenticatedOnlyProps = Pick<
  AuthGateProps,
  'children' | 'fallbackMessage'
> &
  Partial<Pick<AuthGateProps, 'fallbackPath'>>;
// export type UnauthenticatedOnlyProps = {
//   children: React.ReactNode;
//   fallbackPath?: string;
//   fallbackMessage?: string;
// }

function AuthGate({
  children,
  passingCondition,
  fallbackPath,
  fallbackMessage,
}: AuthGateProps) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passingCondition(isLoggedIn())) {
      if (fallbackMessage) notify.error(fallbackMessage);
      navigate(fallbackPath);
      return;
    }
  }, []);

  if (passingCondition(isLoggedIn())) return children;
}

export default AuthGate;
