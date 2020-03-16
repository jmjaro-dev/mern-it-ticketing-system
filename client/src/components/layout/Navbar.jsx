import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon, isAuthenticated, user, logout }) => {

  const onLogout = () => {
    logout();
  }

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/">
          <i className="fas fa-user" style={{ fontSize: "1em", marginRight: "0.8em" }}></i>
          { user && user.firstName }
        </Link>
      </li>

      <li>
        <a href='#!' onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  )

  return (
    <nav className="blue darken-2">
      <div className="nav-wrapper container">
        <Link to="/">
          <i className={icon} />{' '} {title}
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
  user: PropTypes.object
}

Navbar.defaultProps = {
  title: 'IT Ticket Tracker',
  icon: 'fas fa-id-card-alt'
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
