import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { loadUser } from '../../actions/authActions';
import TicketFilters from '../filters/TicketFilters'
import Tickets from '../tickets/Tickets';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';

const Home = ({ tickets, isAuthenticated, loading }) => {
  return (
    <Fragment>
      <div>
        {!isAuthenticated && !tickets ? (
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
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, null)(Home);