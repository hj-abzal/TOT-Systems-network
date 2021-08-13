import React from 'react';
import './App.css';
import DevHeader from '../components/dev-header/DevHeader';
import { DEV_VERSION } from '../config';
import Routes from '../components/routes/Routes';
import { Helmet } from "react-helmet";
function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Planktonics v1.0</title>
        <link rel="canonical" href="https://hj-abzal.github.io/TOT-Systems-network" />
        <meta name="description" content="Planktonics v1.0 messenger app" />
      </Helmet>
      {DEV_VERSION && <DevHeader />}
      <Routes />
    </div>
  );
}

export default App;
