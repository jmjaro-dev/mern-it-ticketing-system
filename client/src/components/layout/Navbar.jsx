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
  const [currentPage, setCurrentPage] = useState(null);
  useEffect(() => {
    M.AutoInit();

    setCurrentPage(window.location.pathname)
    
    if(currentPage) {
      setCurrentPage(window.location.pathname);
      onSetActive(window.location.pathname);
    }
    // eslint-disable-next-line
  },[user]);

  const onSetActive = path => {
    const links = document.querySelector('ul.right').children;
    console.log(links); 
    let current;
    console.log(links)
    switch(path){
      case '/':
        current = links[0].innerText;
        break;
      case '/tickets':
        current = 'Tickets'
        break;
      case '/settings':
        current = 'Settings'
        break;
      case '/login':
        current = 'Login'
        break;
      case '/register':
        current = 'Register'
        break;
      default:
        current = null
    }

    // Adding/Removing 'active' class from element
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].classList.remove('active');
      } else {
        links[index].classList.add('active');
      }
    }
  }

  const setActive = e => {
    e.preventDefault();
    // Gets UL element children
    const links = e.target.parentElement.parentElement.children;
    // Current clicked link
    const current = e.target.innerText;
    // Adding/Removing 'active' class from element
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].classList.remove('active');
      } else {
        links[index].classList.add('active');
      }
    }
    setCurrentPage(window.location.pathname);
  }

  const onLogout = () => {
    resetUserState();
    resetTicketState();
    resetCommentState();
    logout();
  }

  const guestLinks = (
    <Fragment>
      <li onClick={setActive}>
        <Link to='/login' className="nav-links">Login</Link>
      </li>
      <li onClick={setActive}>
        <Link to='/register' className="nav-links">Register</Link>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li onClick={setActive}>
        <Link to="/" className="nav-links">
          <FontAwesomeIcon icon={["fas", "user"]} style={{ marginRight: "0.5em" }}/>
          { user && user.firstName }
        </Link>
      </li>
      
      <li onClick={setActive}>
        <Link to="/tickets" className="nav-links">
          <FontAwesomeIcon icon='file-invoice' style={{ marginRight: '0.35em'}}/>
          Tickets
        </Link>
      </li>

      <li onClick={setActive}>
        <Link to="/settings" className="nav-links">
          <FontAwesomeIcon icon='cog' style={{ marginRight: '0.35em'}}/>
          Settings
        </Link>
      </li>

      <li onClick={setActive}>
        <a href="#!" className="nav-links" onClick={onLogout}>
          <FontAwesomeIcon icon='sign-out-alt' style={{ marginRight: '0.35em'}}/>
          Logout
        </a>
      </li>
    </Fragment>
  )

  return (
    <Fragment>
      <nav className="blue darken-2">
        <div className="nav-wrapper container">
          <Link to="/">
            <FontAwesomeIcon icon={icon} size="lg" style={{ marginRight: "0.5em" }} />
            {' '} {title}
          </Link>
          <ul className="right">
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
  icon: 'file-invoice'
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout, resetUserState, resetTicketState, resetCommentState })(Navbar);
