import { Routes, Route } from "react-router-dom"
import './App.scss';
import Login from "./Login";
import SignUp from "./SignUp";
import Hello from "./Hello";
import AccountUpdate from "./AccountUpdate";
import Header from "./Header";
import PasswordForget from "./PasswordForget";
import PasswordEdit from "./PasswordEdit";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Hello />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/sign_up"
          element={<SignUp />}
        />
        <Route
          path="/update_account"
          element={<AccountUpdate />}
        />
        <Route
          path="/password_forget"
          element={<PasswordForget />}
        />
        <Route
          path="/password_edit"
          element={<PasswordEdit />}
        />
        <Route
          path="/hello"
          element={<Hello />}
        />
      </Routes>
    </div>
  );
}

export default App;
