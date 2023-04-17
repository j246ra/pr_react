import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router} from "react-router-dom"
import './index.css';
import UserProvider from "./providers/UserProvider";
import App from './App';
import reportWebVitals from './reportWebVitals';

render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
