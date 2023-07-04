import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import BaseLayout from './components/BaseLayout';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </div>
  );
}

export default App;
