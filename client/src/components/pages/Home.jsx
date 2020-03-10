import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const Home = ({ user, isAuthenticated }) => {
  return (
    isAuthenticated && user && (
    <div>
      <h1>Hello {user.firstName} {user.lastName}</h1>
    </div>
    )
  )
}

const mapStateToProps = state  => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(Home);