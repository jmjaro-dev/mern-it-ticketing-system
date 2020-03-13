import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component:  Component, isAuthenticated, loading, ...rest }) => {

  return (
    <Route {...rest } render={ props => !isAuthenticated && !loading ? (
      <Redirect to='/login' />
    ) : (
      <Component {...props} />
    )}/>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, null)(PrivateRoute);