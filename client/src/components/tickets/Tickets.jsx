import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketHeaders from './TicketsHeaders';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { getTickets, sortTickets, setSort, clearCurrent } from '../../actions/ticketActions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, tickets, mapped, sorted, filtered, sorting, loading, getTickets,  sortTickets, setSort, clearCurrent }) => {
  useEffect(() => {
    if(current !== null) {
      clearCurrent();
    }

    if(user) {
      getTickets();
    }
    // eslint-disable-next-line
  }, []);

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
          <p className="ticket-label center">Tickets</p>
          <div id="tickets" className="card-panel">
            <table className="responsive-table striped">
              {/* Headers */}
              <TicketHeaders onSetField={onSetField} onSort={onSort}/>
              {/* Body */}
              <tbody>
                <Fragment>
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
        </Fragment>
      ) : (
        <PreLoader />
      )}
    </Fragment>
  )
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  current: PropTypes.object,
  mapped: PropTypes.array,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  sorting: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, { getTickets, sortTickets, setSort, clearCurrent })(Tickets);