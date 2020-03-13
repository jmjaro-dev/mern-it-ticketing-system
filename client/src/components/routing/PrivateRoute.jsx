import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PreLoader from '../layout/PreLoader';

const PrivateRoute = ({ component:  Component, isAuthenticated, loading, user, loadUser, ...rest }) => {
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
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);