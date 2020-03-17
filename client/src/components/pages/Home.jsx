import React, { Fragment,useEffect } from 'react';
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
    <Fragment>
      <div className="card-panel">
        {!loading && !isAuthenticated ? (
          <PreLoader />
        ) : (
          <Tickets />
        )}
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(Home);