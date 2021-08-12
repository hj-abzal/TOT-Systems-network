import React from 'react';
import './App.css';
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
