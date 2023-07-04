import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
