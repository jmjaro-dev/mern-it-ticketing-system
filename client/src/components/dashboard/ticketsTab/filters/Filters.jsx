import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import PropTypes from 'prop-types';

const Filters = ({ tickets, user }) => {
  const [ownedTickets, setOwned] = useState({
    all: null,
    open: null,
    pending: null,
    closed: null
  });
  
  const [assignedTickets, setAssigned] = useState({
    all: null,
    open: null,
    pending: null,
    closed: null
  });

  const filters = ["all", "open", "pending", "closed"];
  
  useEffect(() => {
    if(tickets && user.userType === 'employee') {
      setOwned({
        all: tickets.filter(ticket => ticket.issuedBy._id === user._id).length,
        open: tickets.filter(ticket => ticket.issuedBy._id === user._id && ticket.status === 'open').length,
        pending: tickets.filter(ticket => ticket.issuedBy._id === user._id && ticket.status === 'pending').length,
        closed: tickets.filter(ticket => ticket.issuedBy._id === user._id && ticket.status === 'closed').length
      });
    } else {
      setAssigned({
        all: tickets.filter(ticket => ticket.assignedTo._id === user._id).length,
        open: tickets.filter(ticket => ticket.assignedTo._id === user._id && ticket.status === 'open').length,
        pending: tickets.filter(ticket => ticket.assignedTo._id === user._id && ticket.status === 'pending').length,
        closed: tickets.filter(ticket => ticket.assignedTo._id === user._id && ticket.status === 'closed').length
      });
    } 
    //eslint-disable-next-line
  }, [tickets]);

  return (
    <Fragment>
      {filters.map(filter => (
        <Filter key={filter} filter={filter} tickets={tickets} ownedTickets={ownedTickets} assignedTickets={assignedTickets}/>
      ))}         
    </Fragment>
  )
}

Filters.propTypes = {
  tickets: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  user: state.auth.user
});

export default connect(mapStateToProps)(Filters);