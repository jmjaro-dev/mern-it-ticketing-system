import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import PropTypes from 'prop-types';

const Filters = ({ owned, assigned }) => {
  const filters = ["all", "open", "pending", "closed"];
  
  useEffect(() => {
    if(owned) {
      setOwned({
        all: owned.length,
        open: owned.filter(ticket => ticket.status === 'open').length,
        pending: owned.filter(ticket => ticket.status === 'pending').length,
        closed: owned.filter(ticket => ticket.status === 'closed').length
      });
    } else {
      setAssigned({
        all: assigned.length,
        open: assigned.filter(ticket => ticket.status === 'open').length,
        pending: assigned.filter(ticket => ticket.status === 'pending').length,
        closed: assigned.filter(ticket => ticket.status === 'closed').length
      });
    } 
    //eslint-disable-next-line
  }, []);

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
  
  return (
    <Fragment>
      {filters.map(filter => (
        <Filter key={filter} filter={filter} ownedTickets={ownedTickets} assignedTickets={assignedTickets} />
      ))}         
    </Fragment>
  )
}

Filters.propTypes = {
  owned: PropTypes.array,
  assigned: PropTypes.array
}

const mapStateToProps = state => ({
  owned: state.ticket.owned,
  assigned: state.ticket.assigned
});

export default connect(mapStateToProps)(Filters);