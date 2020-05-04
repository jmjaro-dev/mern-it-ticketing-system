import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, counter }) => {
  return (
    <Fragment>
      {filter === 'All Tickets' && (
        <option key={filter} value="All Tickets">All Tickets ({counter.all})</option>
      )}

      {filter === 'employee' && (
        <option key={filter} value="My Tickets">My Tickets ({counter.owned})</option>
      )}

      {filter === 'technician' && (
        <option key={filter} value="Assigned To Me">Assigned To Me ({counter.assigned})</option>
      )}

      {filter === 'Unassigned' && (
        <option key={filter} value="Unassigned">Unassigned ({counter.unassigned})</option>
      )} Tickets
      
      {filter === 'Open' && (
        <option key={filter} value="Open">Open ({counter.open})</option>
      )}

      {filter === 'Pending' && (
        <option key={filter} value="Pending">Pending ({counter.pending})</option>
      )}

      {filter === 'Closed' && (
        <option key={filter} value="Closed">Closed ({counter.closed})</option>
      )}
  </Fragment>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  counter: PropTypes.object.isRequired
}

export default Filter;
