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
  const { user, isLoggedIn, checkAuthenticated } = useUser();
  const navigate = useNavigate();
  const pass = passingCondition(isLoggedIn());
  useEffect(() => {
    if (!pass) {
      notify.error(fallbackMessage);
      navigate(fallbackPath);
    }
  }, [pass]);
  useEffect(() => {
    if (user.sessionId === undefined || user.sessionId === '' ) {
      checkAuthenticated();
    }
  }, [user.sessionId]);
  return pass ? children : <EmptyComponent />;
}
export default AuthGate;
