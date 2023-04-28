import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom"
import './index.css';
import UserProvider from "./providers/UserProvider";
import AuthApiProvider from "./providers/AuthApiProvider";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <CookiesProvider>
      <UserProvider>
        <AuthApiProvider>
          <App />
        </AuthApiProvider>
      </UserProvider>
    </CookiesProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
