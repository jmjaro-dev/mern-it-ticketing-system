import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';
import { getTickets, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, tickets, filtered, loading, getTickets, clearCurrent }) => {
  useEffect(() => {
    if(current !== null) {
      clearCurrent();
      console.log('Cleared Current');
    }

    if(user) {
      getTickets();
    }
    // eslint-disable-next-line
  }, []);

  if(tickets !== null && tickets.length === 0 && !loading) {
    return <h4>There are no tickets yet. Create one.</h4>
  }
  return (
    <Fragment>
      <div id="tickets" className="card-panel">
        <table className="striped">
          <thead>
            <tr>
                <th className="ticket-info center"># ID</th>
                <th className="ticket-info center">Alert</th>
                <th className="ticket-info center">Status</th>
                <th className="ticket-info center">Subject</th>
                <th className="ticket-info center">Requested By</th>
                <th className="ticket-info center">Priority</th>
                <th className="ticket-info center">Date Issued</th>
                <th className="ticket-info center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets !== null && !loading && (
              <Fragment>
                {filtered !== null ? filtered.map(ticket => (
                  <TicketItem key={ticket._id} ticket={ticket} />
                )) : tickets.map(ticket => (
                  <TicketItem key={ticket._id} ticket={ticket} />
                ))}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  current: PropTypes.object,
  filtered: PropTypes.array,
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  current: state.ticket.current,
  filtered: state.ticket.filtered,
  loading: state.ticket.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getTickets, clearCurrent })(Tickets);