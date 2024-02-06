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
import Hello from '@src/Hello';
import Uncertified from '@src/components/Uncertified';
import Certified from '@src/components/Certified';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <BaseLayout>
        <Routes>
          <Route index element={<Uncertified component={<Login />} />} />
          <Route
            path="/login"
            element={<Uncertified component={<Login />} />}
          />
          <Route
            path="/sign_up"
            element={<Uncertified component={<SignUp />} />}
          />
          <Route
            path="/update_account"
            element={<Certified component={<AccountUpdate />} />}
          />
          <Route
            path="/password_forget"
            element={<Uncertified component={<PasswordForget />} />}
          />
          <Route
            path="/send_success"
            element={<Uncertified component={<ResetMailSendSuccess />} />}
          />
          <Route
            path="/password_edit"
            element={<Certified component={<PasswordEdit />} />}
          />
          <Route
            path="/lifelogs"
            element={<Certified component={<Lifelogs />} />}
          />
          <Route path="/hello" element={<Hello />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
    </div>
  );
}

export default App;
