import React, { useEffect } from 'react';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router';
import notify from '@lib/toast';
import { EmptyComponent } from '@src/components/EmptyComponent';
export type AuthGateProps = {
  children: React.ReactNode;
  passingCondition: (isLoggedIn: boolean) => boolean;
  fallbackPath: string;
  fallbackMessage?: string;
};
function AuthGate({
  children,
  passingCondition,
  fallbackPath,
  fallbackMessage,
}: AuthGateProps) {
  const { user, checkAuthenticated, sessionIdIsBlank } = useUser();
  const navigate = useNavigate();
  const pass = passingCondition(!sessionIdIsBlank());
  useEffect(() => {
    checkAuthenticated();
    if (!pass) {
      if (fallbackMessage) notify.error(fallbackMessage);
      navigate(fallbackPath);
    }
  }, [user]);
  return pass ? children : <EmptyComponent />;
}
export default AuthGate;
