import React from 'react';
import { RESET_MAIL_SUCCESS } from '@lib/consts';

const ResetMailSendSuccess = () => {
  return (
    <div className="session-container">
      <h3>{RESET_MAIL_SUCCESS.INFO}</h3>
    </div>
  );
};

export default ResetMailSendSuccess;
