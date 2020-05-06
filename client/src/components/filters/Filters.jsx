import React, { Fragment, useEffect, useState } from 'react';
import Search from './Search';
import Filter from './Filter';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Filters = ({ tickets, filtered, user, active_filter, setFilter }) => 
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
  const [activeFilter, setActiveFilter] = useState("All Tickets");
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
          assigned: tickets.filter(ticket => ticket.assignedTo._id === user._id).length,
          unassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length,
          open: tickets.filter(ticket => ticket.status === 'open').length,
          pending: tickets.filter(ticket => ticket.status === 'pending').length,
          closed: tickets.filter(ticket => ticket.status === 'closed').length
        })
      } 
    }

    if(tickets && !filtered) {
      onSetFilter(active_filter);
      setActiveFilter(active_filter);
    }

    if(active_filter !== activeFilter && tickets) {
      onSetFilter(active_filter);
      setActiveFilter(active_filter);
    }
    // eslint-disable-next-line
  }, [tickets, active_filter]);

  const onChange = e => {
    setActiveFilter(e.target.value);
    onSetFilter(e.target.value);
  }

  const onSetFilter = filter => {
    const current_url = "tickets";
    let arr = [];
    // Set filter depending on 'filter' value
    switch(filter) {
      case "All Tickets":
        setFilter(filter, tickets, current_url);
        break;
      case "My Tickets": 
        arr = tickets.filter(ticket => {
          return user._id === ticket.issuedBy._id;
        })
        setFilter(filter, arr, current_url);
        break;
      case "Assigned To Me":
        arr = tickets.filter(ticket => {
          return user._id === ticket.assignedTo._id;
        })
        setFilter(filter, arr, current_url);
        break;
      case "Unassigned":
        arr = tickets.filter(ticket => {
          return ticket.assignedTo.to === 'Unassigned';
        })
        setFilter(filter, arr, current_url);
        break;
      case "Open":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr, current_url);
        break;
      case "Pending":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr, current_url);
        break;
      case "Closed":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr, current_url);
        break;
      default:
        setFilter(filter, tickets, current_url);
    }
  }

  return (
    <Fragment>
      <div id="sub-menu" className="row">
        <div className="col s12 m6 l8 left"> 
          {tickets && (
            <Fragment>
              <form>
                <div className="form-group">
                  <span style={{ fontSize: '0.92em', fontWeight: 'bold'}}>
                    Ticket Filter {' '}
                    <FontAwesomeIcon icon="filter" className="blue-text text-darken-2" />
                  </span>
                  <select name="ticketFilter" className="browser-default" defaultValue={active_filter} onChange={onChange} style={{ maxWidth: '200px' }} required>
                  {filters.map(filter => (
                    <Filter key={filter} filter={filter} counter={ticketCounter}/>
                  ))}
                  </select>
                </div>
              </form>
            </Fragment>
          )}
        </div>
        <Search />
      </div>
    </Fragment>
  )
}

Filters.propTypes = {
  tickets: PropTypes.array,
  filtered: PropTypes.array,
  user: PropTypes.object.isRequired,
  active_filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  active_filter: state.ticket.active_filter_tickets
});

export default connect(mapStateToProps, { setFilter })(Filters);
