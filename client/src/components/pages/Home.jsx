import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import TicketFilters from '../filters/TicketFilters'
import Tickets from '../tickets/Tickets';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';

const Home = ({ tickets, isAuthenticated, loading, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>
        {!loading && !isAuthenticated && !tickets ? (
          <PreLoader />
        ) : (
          <Fragment>
            <TicketFilters />
            <Tickets />
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

Home.propTypes = {
  tickets: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { loadUser })(Home);