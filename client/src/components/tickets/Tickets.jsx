import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketHeaders from './TicketsHeaders';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { getTickets, sortTickets, setSort, resetSort, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, tickets, active_filter, mapped, sorted, filtered, sorting, loading, getTickets,  sortTickets, setSort, resetSort, clearCurrent }) => {
  useEffect(() => {
    if(current !== null) {
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
    return <h4>There are no tickets yet. Create one.</h4>
  }
  return (
    <Fragment>
      {tickets !== null && !loading ? (
        <Fragment>
          {/* <p className="ticket-label center">Tickets</p> */}
          <div id="tickets" className="card-panel collection">
            <div className="center blue darken-2" style={styles.header}>
              <span className="white-text">
                Tickets
              </span>
            </div>
            <div className="collection-item">
              <table className="responsive-table striped">
                {/* Headers */}
                {tickets && (!filtered || (filtered && filtered.length !== 0)) && (
                  <TicketHeaders onSetField={onSetField} onSort={onSort}/>
                )}
                {/* Body */}
                <tbody>
                  <Fragment>
                    {filtered !== null && filtered.length === 0 && (
                      <tr>
                        <td className="center" colSpan="8">
                          <p>There are no <span style={styles.emphasized}>{active_filter}</span> tickets.</p>
                        </td>
                      </tr>
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
  mapped: PropTypes.array,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  sorting: PropTypes.object,
  loading: PropTypes.bool,
  active_filter: PropTypes.string,
  user: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  current: state.ticket.current,
  mapped: state.ticket.mapped,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  loading: state.ticket.loading,
  user: state.auth.user,
  active_filter: state.ticket.active_filter_tickets
});

export default connect(mapStateToProps, { getTickets, sortTickets, setSort, resetSort, clearCurrent })(Tickets);