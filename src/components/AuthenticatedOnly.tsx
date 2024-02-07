import React from 'react';
import { AUTHENTICATED_ONLY } from '@lib/consts/component';
import AuthGate, { AuthGateProps } from '@src/components/AuthGate';

export type AuthenticatedOnlyProps = Pick<
  AuthGateProps,
  'children' | 'fallbackMessage'
> &
  Partial<Pick<AuthGateProps, 'fallbackPath'>>;
// export type AuthenticatedOnlyProps = {
//   children: React.ReactNode;
//   fallbackPath?: string;
//   fallbackMessage?: string;
// }

function AuthenticatedOnly({
  children,
  fallbackPath = AUTHENTICATED_ONLY.FALLBACK_PATH,
}: AuthenticatedOnlyProps) {
  return (
    <AuthGate
      children={children}
      passingCondition={(isLoggedIn) => isLoggedIn}
      fallbackPath={fallbackPath}
      fallbackMessage={AUTHENTICATED_ONLY.MESSAGE.ERROR}
    />
  );
}

export default AuthenticatedOnly;
