import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import TicketFilters from '../tickets/TicketFilters';
import Tickets from '../tickets/Tickets';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types'

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
            <TicketFilters />
            <p className="ticket-label center">Tickets</p>
            <Tickets />
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { loadUser })(Home);