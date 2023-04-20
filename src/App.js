import { Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./Login";
import SignUp from "./SignUp";
import Hello from "./Hello";
import AccountUpdate from "./AccountUpdate";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
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
          path="/hello"
          element={<Hello />}
        />
      </Routes>
    </div>
  );
}

export default App;
