import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Search from '../tickets/Search';
import Tickets from '../tickets/Tickets';
import PreLoader from '../layout/PreLoader';

const Home = ({ isAuthenticated, loading, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>
        {!loading && !isAuthenticated ? (
          <PreLoader />
        ) : (
          <Fragment>
            <Search />
            <p className="ticket-label center">Tickets</p>
            <Tickets />
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { loadUser })(Home);