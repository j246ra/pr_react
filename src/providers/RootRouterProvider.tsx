import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Hello from '../Hello';
import Login from '@container/Login';
import SignUp from '@container/SignUp';
import AccountUpdate from '@container/AccountUpdate';
import PasswordForget from '@container/PasswordForget';
import PasswordEdit from '../PasswordEdit';
import ResetMailSendSuccess from '@container/ResetMailSendSuccess';

const RootRouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/update_account" element={<AccountUpdate />} />
        <Route path="/password_forget" element={<PasswordForget />} />
        <Route path="/send_success" element={<ResetMailSendSuccess />} />
        <Route path="/password_edit" element={<PasswordEdit />} />
        <Route path="/hello" element={<Hello />} />
      </Route>
    </Routes>
  );
};

export default RootRouterProvider;
