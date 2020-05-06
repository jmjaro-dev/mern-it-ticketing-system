import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './components/layout/Navbar';
import TicketsPage from './components/tickets/TicketsPage';
import Dashboard from './components/dashboard/Dashboard';
import Settings from './components/settings/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import Ticket from './components/tickets/Ticket';
import CreateTicketModal from './components/tickets/CreateTicketModal';
import UpdateTicketModal from './components/tickets/UpdateTicketModal';
import DeleteTicketModal from './components/tickets/DeleteTicketModal';
import AddCommentModal from './components/comments/AddCommentModal';
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
  faUserPlus,
  faColumns, 
  faFileInvoice,
  faExclamationCircle,
  faSearch,
  faCog,
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faFilter,
  faSort,
  faSortAmountUp,
  faSortAmountDown,
  faSortAlphaUp,
  faSortAlphaDown,
  faSortNumericDown,
  faSortNumericUp,
  faEye,
  faPlus, 
  faEdit,
  faPencilAlt,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
  faPaperPlane,
  faCommentDots,
  faComments
} from '@fortawesome/free-solid-svg-icons';
// icons library 
library.add(faSpinner, faUser, faUserPlus, faColumns, faFileInvoice, faExclamationCircle, faSearch, faCog, faSignInAlt, faSignOutAlt, faBars, faFilter, faSort, faSortAmountUp, faSortAmountDown, faSortAlphaUp, faSortAlphaDown, faSortNumericDown, faSortNumericUp, faEye, faPlus, faEdit, faPencilAlt, faTrashAlt, faChevronLeft, faChevronRight, faChevronCircleDown, faPaperPlane, faCommentDots, faComments);


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
              <CreateTicketModal />
              <DeleteTicketModal />
              <UpdateTicketModal />
              <AddCommentModal />
              <DeleteCommentModal />
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute exact path='/tickets' component={TicketsPage} />
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