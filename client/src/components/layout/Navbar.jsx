import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { resetUserState } from '../../actions/userActions';
import { resetTicketState } from '../../actions/ticketActions';
import { resetCommentState } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Navbar = ({ title, icon, isAuthenticated, user, logout, resetUserState, resetTicketState, resetCommentState }) => {
  const [dropdown, setDropdown] = useState({
    instance: null,
    options: {
      inDuration: 300,
      outDuration: 300,
      coverTrigger: false // Displays dropdown below the button
    }
  });

  useEffect(() => {
    M.AutoInit();
    if(user) {
      let ddown = document.querySelector('.dropdown-trigger');
      let instance = M.Dropdown.init(ddown, dropdown.options);
      setDropdown({
        ...dropdown,
        instance: instance
      })
    }
    // eslint-disable-next-line
  },[user]);

  const onDropdown = () => {    
    dropdown.instance.open();
  }
  
  const onLogout = () => {
    resetUserState();
    resetTicketState();
    resetCommentState();
    logout();
  }

  const dropDownContent = (
    <ul id="dropdown1" className="dropdown-content">
      <li className="blue-text text-darken-2">
        <Link to="/settings" className="nav-links">
          <FontAwesomeIcon icon='cog' style={{ marginRight: '0.35em'}}/>
          Settings
        </Link>
      </li>
      <li className="blue-text text-darken-2">
        <a href="#!" className="nav-links" onClick={onLogout}>
          <FontAwesomeIcon icon='sign-out-alt' style={{ marginRight: '0.35em'}}/>
          Logout
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login' className="nav-links">Login</Link>
      </li>
      <li>
        <Link to='/register' className="nav-links">Register</Link>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/" className="nav-links">
          <FontAwesomeIcon icon={["fas", "user"]} style={{ marginRight: "0.5em" }}/>
          { user && user.firstName }
        </Link>
      </li>
      
      <li>
        <Link to="/tickets" className="nav-links">
          Tickets
        </Link>
      </li>

      <li>
        <a className="dropdown-trigger" href="#!" data-target="dropdown1" onClick={onDropdown}>
          <FontAwesomeIcon icon='chevron-circle-down'/>
        </a>
      </li>
    </Fragment>
  )

  return (
    <Fragment>
      {dropDownContent}
      <nav className="blue darken-2">
        <div className="nav-wrapper container">
          <Link to="/">
            <FontAwesomeIcon icon={icon} size="lg" style={{ marginRight: "0.5em" }} />
            {' '} {title}
          </Link>
          <ul id="nav-mobile" className="right">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </Fragment>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  resetUserState: PropTypes.func.isRequired,
  resetTicketState: PropTypes.func.isRequired,
  resetCommentState: PropTypes.func.isRequired
}

Navbar.defaultProps = {
  title: 'IT Ticket Tracker',
  icon: 'id-card-alt'
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout, resetUserState, resetTicketState, resetCommentState })(Navbar);
