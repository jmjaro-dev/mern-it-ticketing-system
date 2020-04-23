import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { resetUserState } from '../../actions/userActions';
import { resetTicketState } from '../../actions/ticketActions';
import { resetCommentState } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon, isAuthenticated, user, logout, resetUserState, resetTicketState, resetCommentState }) => {

  const onLogout = () => {
    resetUserState();
    resetTicketState();
    resetCommentState();
    logout();
  }

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
        <a href='#!' className="nav-links" onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  )

  return (
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
