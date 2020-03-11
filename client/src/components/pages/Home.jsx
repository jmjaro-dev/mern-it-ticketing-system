import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const Home = ({ user, isAuthenticated, loadUser }) => {
  useEffect(() => {
    if(isAuthenticated) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);
  
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

const mapStateToProps = state  => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(Home);