import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import UserProvider from "./providers/UserProvider";
import AuthApiProvider from "./providers/AuthApiProvider";
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";
import LifelogApiProvider from "./providers/LifelogApiProvider";
import RootRouterProvider from "./providers/RootRouterApovider";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <UserProvider>
      <AuthApiProvider>
        <LifelogApiProvider>
          <RootRouterProvider />
        </LifelogApiProvider>
      </AuthApiProvider>
    </UserProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
