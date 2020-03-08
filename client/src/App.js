import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Styles
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Route exact path ='/login' component={Login} />
          <Route exact path ='/register' component={Register} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;