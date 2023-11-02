import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '@lib/consts/component';
import styles from './SessionOtherLinks.module.scss';
import { SESSION_OTHER_LINKS_TEST_ID as TEST_ID } from '@lib/consts/testId';

type SessionOtherLinksProps = {
  passwordForgetEnabled?: boolean;
  signUpEnabled?: boolean;
};

export const SessionOtherLinks = ({
  passwordForgetEnabled,
  signUpEnabled,
}: SessionOtherLinksProps) => {
  if (!passwordForgetEnabled && !signUpEnabled) return null;
  return (
    <div className={styles.links}>
      {passwordForgetEnabled && (
        <Link
          className={styles.passwordForgetLink}
          to={'/password_forget'}
          data-testid={TEST_ID.PASSWORD_FORGET}
        >
          {LOGIN.LINK.PASSWORD_FORGET}
        </Link>
      )}
      {signUpEnabled && (
        <Link
          className={styles.signUpLink}
          to={'/sign_up'}
          data-testid={TEST_ID.SIGN_UP}
        >
          {LOGIN.LINK.SIGN_UP}
        </Link>
      )}
    </div>
  );
};

export default SessionOtherLinks;
