import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import UpdateProfileModal from './components/profile/profileTab/UpdateProfileModal';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import Ticket from './components/tickets/Ticket';
import CreateTicketModal from './components/tickets/CreateTicketModal';
import UpdateTicketModal from './components/tickets/UpdateTicketModal';
import DeleteTicketModal from './components/tickets/DeleteTicketModal';
import DeleteCommentModal from './components/comments/DeleteCommentModal';
import Alerts from './components/layout/Alerts';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Utils
import setAuthToken from './utils/setAuthToken';
// Styles
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { 
  faSpinner,
  faUser, 
  faIdCardAlt,
  faExclamationCircle,
  faSearch,
  faCog,
  faSignOutAlt,
  faSort,
  faSortUp,
  faSortDown,
  faEye, 
  faEdit,
  faPencilAlt,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
// icons library 
library.add(faSpinner, faUser, faIdCardAlt, faExclamationCircle, faSearch, faCog, faSignOutAlt, faSort, faSortUp, faSortDown, faEye, faEdit, faPencilAlt, faTrashAlt, faChevronLeft, faChevronRight, faChevronCircleDown, faPaperPlane);


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
            <div className="main-container">
              <Alerts />
              <UpdateProfileModal />
              <CreateTicketModal />
              <DeleteTicketModal />
              <UpdateTicketModal />
              <DeleteCommentModal />
              
              <Switch>
                <PrivateRoute exact path='/' component={Profile} />
                <PrivateRoute exact path='/tickets' component={Home} />
                <PrivateRoute exact path='/tickets/:id' component={Ticket}/>
                <PrivateRoute exact path='/settings' component={Settings}/>
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