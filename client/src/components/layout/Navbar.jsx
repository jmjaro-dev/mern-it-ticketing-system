import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { resetUserState } from '../../actions/userActions';
import { setCurrentTicketExists, clearCurrentTicketExists, resetTicketState } from '../../actions/ticketActions';
import { resetCommentState } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Navbar = ({ title, icon, isAuthenticated, user, current_ticket_exists, setCurrentTicketExists, clearCurrentTicketExists, logout, resetUserState, resetTicketState, resetCommentState }) => {
  const [currentPage, setCurrentPage] = useState(null);
  let location = useLocation();
  
  let current_ticket = localStorage.getItem('currentTicket'); 

  useEffect(() => {
    M.AutoInit();

    setCurrentPage(window.location.pathname);

    if(!user) {
      setCurrentPage(window.location.pathname);
      onSetActive(window.location.pathname);
    }

    if(currentPage) {
      setCurrentPage(window.location.pathname);
      onSetActive(window.location.pathname);
    }

    if(current_ticket && !current_ticket_exists) {
      setCurrentTicketExists();
    } 

    // eslint-disable-next-line
  },[user, currentPage, window.location.pathname, location ]);

  const onSetActive = path => {
    const links = document.querySelector('ul.right').children;
    
    let current;
    
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

    let sideNavLinks;
    if(!user && (path === '/login' || path === '/register')) {
      sideNavLinks = document.querySelector('#sidenav-guest').children;
      // Adding/Removing 'active' class from Guest SideNav Links elements
      for(let index=0; index < sideNavLinks.length; index++) {
        if(sideNavLinks[index].innerText !== current) {
          sideNavLinks[index].classList.remove('active');
        } else {
          sideNavLinks[index].classList.add('active');
        }
      }
    } 
    if(user) {
      sideNavLinks = document.querySelector('#sidenav-member').children;
      // Adding/Removing 'active' class from Member SideNav Links elements
      for(let index=0; index < sideNavLinks.length; index++) {
        if(sideNavLinks[index].innerText !== current) {
          sideNavLinks[index].classList.remove('active');
        } else {
          sideNavLinks[index].classList.add('active');
        }
      }
    }
    
    // Adding/Removing 'active' class from Links elements
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].classList.remove('active');
      } else {
        links[index].classList.add('active');
      }
    }
  }

  const setActive = () => {
    onSetActive(window.location.pathname);
    setCurrentPage(window.location.pathname);
    if(current_ticket) {
      localStorage.removeItem('currentTicket');
      clearCurrentTicketExists();
    }
  }

  const onCloseSideNav = e => {
    let elem;
    if(e.target.tagName === 'svg') {
      elem = document.getElementById(e.target.parentElement.parentElement.parentElement.id);  
    } 
    if(e.target.tagName === 'path') {
      elem = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.id);
    } 
    
    if(e.target.tagName === 'A') {
      elem = document.getElementById(e.target.parentElement.parentElement.id);
    }
    onSetActive(window.location.pathname);
    const instance = M.Sidenav.getInstance(elem);
    instance.close();
  }

  const onLogout = () => {
    // Close Sidenav
    const instance = M.Sidenav.getInstance(document.querySelector("#sidenav-member"));
    instance.close();
    // Reset all State and Logout
    resetUserState();
    resetTicketState();
    resetCommentState();
    logout();
  }

  const guestLinks = (
    <Fragment>
      <li onClick={setActive}>
        <Link to='/login' className="nav-links">
          <FontAwesomeIcon icon='sign-in-alt' style={{ marginRight: '0.35em'}}/>
          Login
        </Link>
      </li>
      <li onClick={setActive}>
        <Link to='/register' className="nav-links">
          <FontAwesomeIcon icon='user-plus' style={{ marginRight: '0.5em'}}/>
          Register
        </Link>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li onClick={setActive}>
        <Link to="/" className="nav-links">
          <FontAwesomeIcon icon="columns" style={{ marginRight: "0.5em" }}/>
          <span className="hide-on-small-only">
            Dashboard
          </span>
        </Link>
      </li>
      
      <li onClick={setActive}>
        <Link to="/tickets" className="nav-links">
          <FontAwesomeIcon icon='file-invoice' style={{ marginRight: '0.35em'}}/>
          <span className="hide-on-small-only">
            Tickets
          </span>
        </Link>
      </li>

      <li onClick={setActive}>
        <Link to="/settings" className="nav-links">
          <FontAwesomeIcon icon='cog' style={{ marginRight: '0.35em'}}/>
          <span className="hide-on-small-only">
            Settings
          </span>
        </Link>
      </li>

      <li onClick={setActive}>
        <a href="#!" className="nav-links" onClick={onLogout}>
          <FontAwesomeIcon icon='sign-out-alt' style={{ marginRight: '0.35em'}}/>
          <span className="hide-on-small-only">
            Logout
          </span>
        </a>
      </li>
    </Fragment>
  )

  const guestSideNav = (
    <ul id="sidenav-guest" className="sidenav">
      <li>
        <div className="user-view">
          <div className="background blue darken-2" />
          <span className="white-text name" style={{ paddingBottom: "2em" }}>
          <FontAwesomeIcon icon="file-invoice" style={{ marginRight: "1em" }} />
            IT Ticketing System
          </span>
        </div>
      </li>
          
      <li className="active" onClick={onCloseSideNav}>
        <Link to='/login' className="nav-links">
          <FontAwesomeIcon icon='sign-in-alt' style={{ marginRight: '0.5em'}}/>
          Login
        </Link>
      </li>
      <li onClick={onCloseSideNav}>
        <Link to='/register' className="nav-links">
          <FontAwesomeIcon icon='user-plus' style={{ marginRight: '0.5em'}}/>
          Register
        </Link>
      </li>
    </ul>
  )

  const memberSideNav = (
    <Fragment>
      {user && isAuthenticated && (
        <ul id="sidenav-member" className="sidenav">
          <li className="active">
            <div className="user-view">
              <div className="background blue darken-2" />
              <span className="white-text name">{user.firstName} {user.lastName}</span>
              <span className="white-text email">{user.email}</span>
            </div>
          </li>
          <li onClick={setActive}>
            <Link to="/" className="nav-links">
              <FontAwesomeIcon icon="columns" style={{ marginRight: "1em" }} />
              Dashboard
            </Link>
          </li>
          
          <li onClick={setActive}>
            <Link to="/tickets" className="nav-links">
              <FontAwesomeIcon icon='file-invoice' style={{ marginRight: '1em' }} />
              Tickets
            </Link>
          </li>
    
          <li onClick={setActive}>
            <Link to="/settings" className="nav-links">
              <FontAwesomeIcon icon='cog' style={{ marginRight: '1em' }} />
              Settings
            </Link>
          </li>
    
          <li onClick={setActive}>
            <Link to="/login" className="nav-links" onClick={onLogout}>
              <FontAwesomeIcon icon='sign-out-alt' style={{ marginRight: '1em' }} />
              Logout
            </Link>
          </li>  
        </ul>
      )}
    </Fragment>
  )

  return (
    <Fragment>
      <nav className="blue darken-2">
        {user && isAuthenticated ? memberSideNav : guestSideNav}
        <div className="nav-wrapper container">
          <Link to="/">
            <FontAwesomeIcon icon={icon} size="lg" style={{ marginRight: "0.5em" }} />
            {' '} {title}
          </Link>
          <ul className="right hide-on-small-only">
            {user && isAuthenticated ? authLinks : guestLinks}
          </ul>

          {/* Auth User SideNav Trigger */}
          <ul className="right hide-on-med-and-up">
            <li>
              <a className="sidenav-trigger hide-on-med-and-up" href="#!" data-target={isAuthenticated ? "sidenav-member" : "sidenav-guest"}>
              <FontAwesomeIcon icon='bars' style={{ marginRight: '0.35em'}}/>
            </a>
            </li>
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
  current_ticket_exists: PropTypes.bool,
  setCurrentTicketExists: PropTypes.func.isRequired, 
  clearCurrentTicketExists: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetUserState: PropTypes.func.isRequired,
  resetTicketState: PropTypes.func.isRequired,
  resetCommentState: PropTypes.func.isRequired
}

Navbar.defaultProps = {
  title: 'IT Ticketing System',
  icon: 'file-invoice'
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  current_ticket_exists: state.ticket.current_ticket_exists
});

export default connect(mapStateToProps, { setCurrentTicketExists, clearCurrentTicketExists, logout, resetUserState, resetTicketState, resetCommentState })(Navbar);
