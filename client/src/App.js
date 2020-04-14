import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Profile from './components/profile/Profile';
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
// import { PersistGate } from 'redux-persist/integration/react';
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
  faSort,
  faSortUp,
  faSortDown,
  faEye, 
  faEdit,
  faChevronLeft,
  faChevronRight,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
// font library init
library.add(faSpinner, faUser, faIdCardAlt, faExclamationCircle, faSearch, faSort, faSortUp, faSortDown, faEye, faEdit, faTrashAlt, faChevronLeft, faChevronRight, faPaperPlane);


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
              {/* <AddBtn /> */}
              <CreateTicketModal />
              <DeleteTicketModal />
              {/* <UpdateTicketModal /> */}
              <DeleteCommentModal />
              
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/profile' component={Profile} />
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