import React, { Fragment, useEffect, useState } from 'react';
import Search from './Search';
import Filter from './Filter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Filters = ({ tickets, user }) => 
{
  const [ticketCounter, setTicketCounter] = useState({
    all: null,
    owned: null,
    assigned: null,
    unassigned: null,
    open: null,
    pending: null,
    closed: null
  });

  const filters = ["All Tickets", user.userType, "Unassigned", "Open", "Pending", "Closed"];

  useEffect(() => {
    if(tickets) {
      if(user.userType === 'employee') {
        setTicketCounter({
          ...ticketCounter,
          all: tickets.length,
          owned: tickets.filter(ticket => ticket.issuedBy._id === user._id).length,
          unassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length,
          open: tickets.filter(ticket => ticket.status === 'open').length,
          pending: tickets.filter(ticket => ticket.status === 'pending').length,
          closed: tickets.filter(ticket => ticket.status === 'closed').length
        });
      } else {
        setTicketCounter({
          ...ticketCounter,
          all: tickets.length,
          assigned: tickets.filter(ticket => ticket.assignetTo._id === user._id).length,
          unassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length,
          open: tickets.filter(ticket => ticket.status === 'open').length,
          pending: tickets.filter(ticket => ticket.status === 'pending').length,
          closed: tickets.filter(ticket => ticket.status === 'closed').length
        })
      } 
    }
    // eslint-disable-next-line
  }, [tickets]);

  return (
    <Fragment>
      <nav id="sub-menu"  className="transparent">
        <div className="col s7 nav-wrapper">
          <ul className="ticket-details nav-wrapper">
            {filters.map(filter => (
              <Filter key={filter} filter={filter} tickets={tickets} counter={ticketCounter}/>
            ))}         
          </ul>
        </div>
        <Search />
      </nav>
    </Fragment>
  )
}

Filters.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Filters);
