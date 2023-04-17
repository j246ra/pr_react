import { Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./Login";
import Hello from "./Hello";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Login />}
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
