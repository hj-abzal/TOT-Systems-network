import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from '../features/authorization/Login/Login';
import { Registration } from '../features/authorization/Registration/Registration';
import DevHeader from '../components/dev-header/DevHeader';
import { DEV_VERSION } from '../config';
import Routes from '../components/routes/Routes';

function App() {
  return (
    <div className="App">
      {DEV_VERSION && <DevHeader />}
      <Routes />
    </div>
  );
}

export default App;
