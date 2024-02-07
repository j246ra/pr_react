import React from 'react';
import { COMMON } from '@lib/consts/common';
import AuthGate from '@src/components/AuthGate';

export type UncertifiedProps = {
  component: React.ReactNode;
  redirectTo?: string;
};

function Uncertified({
  component,
  redirectTo = COMMON.REDIRECT_TO.UNCERTIFIED,
}: UncertifiedProps) {
  return (
    <AuthGate
      children={component}
      passingCondition={(isLoggedIn) => !isLoggedIn}
      fallbackPath={redirectTo}
    />
  );
}

export default Uncertified;
