import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import BaseLayout from './components/BaseLayout';
import Login from '@session/container/Login';
import SignUp from '@session/container/SignUp';
import AccountUpdate from '@session/container/AccountUpdate';
import PasswordForget from '@session/container/PasswordForget';
import PasswordEdit from '@session/container/PasswordEdit';
import ResetMailSendSuccess from '@session/container/ResetMailSendSuccess';
import Lifelogs from '@lifelog/Lifelogs';
import NotFound from '@src/components/NotFound';
import UnauthenticatedOnly from '@src/components/UnauthenticatedOnly';
import Certified from '@src/components/Certified';
import { ROUTES } from '@lib/consts/common';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <BaseLayout>
        <Routes>
          <Route index element={<UnauthenticatedOnly children={<Login />} />} />
          <Route
            path={ROUTES.LOGIN}
            element={<UnauthenticatedOnly children={<Login />} />}
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={<UnauthenticatedOnly children={<SignUp />} />}
          />
          <Route
            path={ROUTES.ACCOUNT_UPDATE}
            element={<Certified component={<AccountUpdate />} />}
          />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            element={<UnauthenticatedOnly children={<PasswordForget />} />}
          />
          <Route
            path={ROUTES.RESET_MAIL_SEND_SUCCESS}
            element={
              <UnauthenticatedOnly children={<ResetMailSendSuccess />} />
            }
          />
          <Route
            path={ROUTES.PASSWORD_EDIT}
            element={<Certified component={<PasswordEdit />} />}
          />
          <Route
            path={ROUTES.LIFELOGS}
            element={<Certified component={<Lifelogs />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
    </div>
  );
}

export default App;
