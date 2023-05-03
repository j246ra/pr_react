import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import UserProvider from "./providers/UserProvider";
import AuthApiProvider from "./providers/AuthApiProvider";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";
import LifelogApiProvider from "./providers/LifelogApiProvider";
import Hello from "./Hello";
import Login from "./Login";
import SignUp from "./SignUp";
import AccountUpdate from "./AccountUpdate";
import PasswordForget from "./PasswordForget";
import PasswordEdit from "./PasswordEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Hello />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/sign_up" element={<SignUp />}/>
      <Route path="/update_account" element={<AccountUpdate />}/>
      <Route path="/password_forget" element={<PasswordForget />}/>
      <Route path="/password_edit" element={<PasswordEdit />}/>
      <Route path="/hello" element={<Hello />}/>
    </Route>
  )
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <UserProvider>
      <AuthApiProvider>
        <LifelogApiProvider>
          <RouterProvider router={router} />
        </LifelogApiProvider>
      </AuthApiProvider>
    </UserProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
