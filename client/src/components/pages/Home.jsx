import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Tickets from '../tickets/Tickets';
import PreLoader from '../layout/PreLoader';

const Home = ({ user, isAuthenticated, loading, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {!loading && !isAuthenticated ? (
        <PreLoader />
      ) : (
        <Tickets />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(Home);