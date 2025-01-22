import React from 'react';
import { Link } from 'react-router';
import { LOGIN } from '@lib/consts/component';
import styles from './SessionOtherLinks.module.scss';
import { SESSION_OTHER_LINKS_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { ROUTES } from '@lib/consts/common';
import { EmptyComponent } from '@src/components/EmptyComponent';

type SessionOtherLinksProps = {
  passwordForgetEnabled?: boolean;
  signUpEnabled?: boolean;
};

export default function SessionOtherLinks({
  passwordForgetEnabled,
  signUpEnabled,
}: SessionOtherLinksProps) {
  if (!passwordForgetEnabled && !signUpEnabled) return <EmptyComponent />;
  return (
    <div className={styles.links}>
      {passwordForgetEnabled && (
        <Link
          className={styles.passwordForgetLink}
          to={ROUTES.PASSWORD_FORGET}
          data-testid={TEST_ID.PASSWORD_FORGET}
        >
          {LOGIN.LINK.PASSWORD_FORGET}
        </Link>
      )}
      {signUpEnabled && (
        <Link
          className={styles.signUpLink}
          to={ROUTES.SIGN_UP}
          data-testid={TEST_ID.SIGN_UP}
        >
          {LOGIN.LINK.SIGN_UP}
        </Link>
      )}
    </div>
  );
}
