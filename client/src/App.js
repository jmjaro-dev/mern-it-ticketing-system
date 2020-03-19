import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import Ticket from './components/tickets/Ticket';
// import AddBtn from './components/layout/AddBtn';
import DeleteCommentModal from './components/comments/DeleteCommentModal';
import Alerts from './components/layout/Alerts';
// Redux
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
// Utils
import setAuthToken from './utils/setAuthToken';
// Styles
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <div className="container">
              <Alerts />
              {/* <AddBtn /> */}
              <DeleteCommentModal />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/tickets/:id' component={Ticket}/>
                <Route exact path ='/login' component={Login} />
                <Route exact path ='/register' component={Register} />
              </Switch>
            </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;