import React from 'react';
import { Router } from "react-router-dom";
import history from '../history';
import Routes from '../Routes';

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Routes />
      </div>
    </Router>
  )
}

export default App;
