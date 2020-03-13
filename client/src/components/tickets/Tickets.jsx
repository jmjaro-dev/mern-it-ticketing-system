import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { getTickets } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Tickets = ({ tickets, filtered, loading, getTickets }) => {
  useEffect(() => {
    getTickets();
    // eslint-disable-next-line
  }, []);

  if(tickets !== null && tickets.length === 0 && !loading) {
    return <h4>There are no tickets yet. Create one.</h4>
  }
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
              <th># ID</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Title</th>
              <th>Requested By</th>
              <th>Date Issued</th>
              <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets !== null && !loading ? (
            <Fragment>
              {filtered !== null ? filtered.map(ticket => (
                <TicketItem ticket={ticket} />
              )) : tickets.map(ticket => (
                <TicketItem ticket={ticket} />
              ))}
            </Fragment>
          ) : <PreLoader /> }
        </tbody>
      </table>
    </Fragment>
  )
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  filtered: state.ticket.filtered,
  loading: state.ticket.loading,
});

export default connect(mapStateToProps, { getTickets })(Tickets);