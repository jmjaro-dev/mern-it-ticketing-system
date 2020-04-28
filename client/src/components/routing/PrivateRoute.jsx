import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PreLoader from '../layout/PreLoader';
import { setCurrent, getTicket } from '../../actions/ticketActions';
import PropTypes from 'prop-types';


const PrivateRoute = ({ component:  Component, isAuthenticated, loading, user, current, setCurrent, getTicket, loadUser, ...rest }) => {
  useEffect(() => {
    if(localStorage.token && !user) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      {!user && localStorage.token ? (
        <PreLoader />
      ) : (
        <Route {...rest } render={ props => !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )}/>
      )}
    </div>
  )
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  // current: PropTypes.object,
  // setCurrent: PropTypes.func.isRequired,
  // getTicket: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.authLoading,
  user: state.auth.user,
  // current: state.ticket.current
});

export default connect(mapStateToProps, { setCurrent, getTicket, loadUser })(PrivateRoute);