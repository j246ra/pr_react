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

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <BaseLayout>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/update_account" element={<AccountUpdate />} />
          <Route path="/password_forget" element={<PasswordForget />} />
          <Route path="/send_success" element={<ResetMailSendSuccess />} />
          <Route path="/password_edit" element={<PasswordEdit />} />
          <Route path="/lifelogs" element={<Lifelogs />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
    </div>
  );
}

export default App;
