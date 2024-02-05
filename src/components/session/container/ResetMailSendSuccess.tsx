import React from 'react';
import { RESET_MAIL_SUCCESS } from '@lib/consts/component';
import { Callout, Intent } from '@blueprintjs/core';
import styles from './ResetMailSendSuccess.module.scss';

export default function ResetMailSendSuccess() {
  return (
    <Callout className={styles.callout} intent={Intent.SUCCESS}>
      {RESET_MAIL_SUCCESS.INFO}
    </Callout>
  );
}
