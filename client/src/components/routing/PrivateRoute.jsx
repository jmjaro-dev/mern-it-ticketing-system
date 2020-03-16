import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PreLoader from '../layout/PreLoader';
import { setCurrent, getTicket } from '../../actions/ticketActions';

const PrivateRoute = ({ component:  Component, match, isAuthenticated, loading, user, current, setCurrent, getTicket, loadUser, ...rest }) => {
  useEffect(() => {
    if(localStorage.token) {
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
  current: state.ticket.current
});

export default connect(mapStateToProps, { setCurrent, getTicket, loadUser })(PrivateRoute);