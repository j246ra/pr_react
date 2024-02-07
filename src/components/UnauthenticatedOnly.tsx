import React from 'react';
import AuthGate, { AuthGateProps } from '@src/components/AuthGate';
import { UNAUTHENTICATED_ONLY } from '@lib/consts/component';

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

function UnauthenticatedOnly({
  children,
  fallbackPath = UNAUTHENTICATED_ONLY.FALLBACK_PATH,
  fallbackMessage,
}: UnauthenticatedOnlyProps) {
  return (
    <AuthGate
      children={children}
      passingCondition={(isLoggedIn) => !isLoggedIn}
      fallbackPath={fallbackPath}
      fallbackMessage={fallbackMessage}
    />
  );
}

export default UnauthenticatedOnly;
