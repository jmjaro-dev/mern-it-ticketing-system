import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TicketHeaders from './TicketsHeaders';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { setPreviousUrl } from '../../actions/authActions';
import { getTickets, sortTickets, setSort, resetSort, setFilter, clearFilter, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists, clearCurrent } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, current_ticket_exists, tickets, active_filter, previousUrl, setPreviousUrl, mapped, sorted, filtered, sorting, loading, getTickets, sortTickets, setSort, resetSort, setFilter, clearFilter, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists, clearCurrent }) => {
  let current_ticket = JSON.parse(localStorage.getItem('currentTicket')); 

  useEffect(() => {
    clearFilter();

    if((previousUrl === null || previousUrl !== window.location.pathname) && !current_ticket){
      setPreviousUrl(window.location.pathname);
    }

    if(user && !current && current_ticket && !loading) {
      setCurrent(current_ticket, 'tickets');
      setTicketExists(true);
      setCurrentTicketExists();
    }

    if(user && current && current_ticket && !loading) {
      setTicketExists(false);
      clearCurrentTicketExists();
      localStorage.removeItem('currentTicket');
    }

    if(active_filter) {
      onSetFilter(active_filter);
    }
    
    if(current !== null && !current_ticket) {
      clearCurrent();
    }

    if(user && !tickets) {
      getTickets();
    }

    if(sorted !== null) {
      resetSort();
    }
    // eslint-disable-next-line
  }, [tickets]);

  const { isSorted, order } = sorting;
  let sortBy = null;

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

  const onSetField = e => {
    e.preventDefault();
    sortBy = document.getElementById(e.target.id).getAttribute("data_sort");
    setSort({ isSorted: true, field: sortBy, order: 'asc'});
    onSort(sortBy);
  }

  const onSort = field => {
    if(isSorted) {
      if(order === null || order === 'asc') {
        setSort({ 
          ...sorting,
          field: sortBy,
          order: 'desc'
        })
        sortTickets(field);
      } else {
        setSort({ 
          ...sorting,
          field: sortBy,
          order: 'asc'
        })
        sortTickets(field);
      }
    } else {
      setSort({ 
        isSorted: true,
        field: sortBy,
        order: 'desc'
      })
      sortTickets(field);
    }
  }

  if(tickets !== null && tickets.length === 0 && !loading) {
    return (
      <div className="card-panel center">
        <p>There are no tickets yet.</p>
      </div>
    )
  }
  return (
    <Fragment>
      {tickets !== null && !loading ? (
        <Fragment>
          {user && tickets && current && current.ticket && current_ticket && current_ticket_exists &&!loading && (
            <Redirect to={`/tickets/${current.ticket._id}`} />
          )}
          {/* <p className="ticket-label center">Tickets</p> */}
          <div id="tickets" className="card-panel collection">
            <div className="center" style={styles.header}>
              <span>
                <FontAwesomeIcon icon="file-invoice" className="blue-text text-darken-2" /> {' '}
                Tickets
              </span>
            </div>
            <div className="collection-item">
              <table className="responsive-table striped">
                {/* Headers */}
                {tickets && (!filtered || (filtered && filtered.length !== 0)) && (
                  <TicketHeaders onSetField={onSetField} />
                )}
                {/* Body */}
                <tbody>
                  <Fragment>
                    {filtered !== null && filtered.length === 0 && (
                      <Fragment>
                        {active_filter !== 'All Tickets' && active_filter !== 'My Tickets' && active_filter !== 'Assigned To Me' ? (
                          <tr>
                            <td className="center" colSpan="8">
                              <p>There are no <span style={styles.emphasized}>{active_filter}</span> tickets.</p>
                            </td>
                          </tr>
                        ) : (
                          <Fragment>
                            {active_filter === 'All Tickets' && (
                              <tr>
                              <td className="center" colSpan="8">
                                <p>There are no tickets yet.</p>
                              </td>
                            </tr>
                            )}

                            {active_filter === 'My Tickets' && (
                              <tr>
                                <td className="center" colSpan="8">
                                  <p>You haven't created a ticket yet.</p>
                                </td>
                              </tr>
                            )}

                            {active_filter === 'Assigned To Me' && (
                              <tr>
                                <td className="center" colSpan="8">
                                  <p>There are no tickets assigned to you.</p>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                    {filtered !== null || sorted !== null ? 
                    (
                      // If filtered not null
                      <Fragment>
                      {sorted !== null && filtered !== null ? (filtered.map(ticket => (
                          <TicketItem key={ticket._id} ticket={ticket} />
                        ))
                        ) : (mapped.map(ticket => (
                            <TicketItem key={ticket._id} ticket={ticket} />
                        )))
                      }
                      </Fragment>
                    ) 
                    : tickets.map(ticket => (
                      <TicketItem key={ticket._id} ticket={ticket} />
                    ))}
                  </Fragment>
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      ) : (
        <PreLoader />
      )}
    </Fragment>
  )
}

const styles = {
  header: {
    fontWeight: '500',
    fontSize: '1.2em',
    padding: '0.5em 0'
  },
  emphasized: {
    fontWeight: '500'
  }
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  current: PropTypes.object,
  current_ticket_exists: PropTypes.bool,
  mapped: PropTypes.array,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  sorting: PropTypes.object,
  loading: PropTypes.bool,
  previousUrl: PropTypes.string,
  active_filter: PropTypes.string,
  user: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired, 
  setTicketExists: PropTypes.func.isRequired,
  setCurrentTicketExists: PropTypes.func.isRequired,
  clearCurrentTicketExists: PropTypes.func.isRequired,
  setPreviousUrl: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  current: state.ticket.current,
  current_ticket_exists: state.ticket.current_ticket_exists,
  mapped: state.ticket.mapped,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  loading: state.ticket.loading,
  user: state.auth.user,
  previousUrl: state.auth.previousUrl,
  active_filter: state.ticket.active_filter_tickets
});

export default connect(mapStateToProps, { getTickets, setPreviousUrl, sortTickets, setSort, resetSort, setFilter, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists, clearFilter, clearCurrent })(Tickets);