import React from 'react';
import { CERTIFIED } from '@lib/consts/component';
import { COMMON } from '@lib/consts/common';
import AuthGate from '@src/components/AuthGate';

export type CertifiedProps = {
  component: React.ReactNode;
  redirectTo?: string;
};

function Certified({
  component,
  redirectTo = COMMON.REDIRECT_TO.CERTIFIED,
}: CertifiedProps) {
  return (
    <AuthGate
      children={component}
      passingCondition={(isLoggedIn) => isLoggedIn}
      fallbackPath={redirectTo}
      fallbackMessage={CERTIFIED.ERROR}
    />
  );
}

export default Certified;
