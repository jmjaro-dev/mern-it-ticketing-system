import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CreateBtn from '../layout/CreateBtn';
import TicketFilters from '../filters/TicketFilters'
import Tickets from './Tickets';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';

const TicketsPage = ({ user, tickets, isAuthenticated }) => {
  return (
    <Fragment>
      <div>
        {!isAuthenticated && !tickets ? (
          <PreLoader />
        ) : (
          <Fragment>
            <CreateBtn user={user} />
            <TicketFilters />
            <Tickets />
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

TicketsPage.propTypes = {
  user: PropTypes.object,
  tickets: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  tickets: state.ticket.tickets,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(TicketsPage);