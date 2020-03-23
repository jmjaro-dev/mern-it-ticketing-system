import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { getTickets, sortTickets, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, tickets, sorted, filtered, loading, getTickets, sortTickets, clearCurrent }) => {
  useEffect(() => {
    if(current !== null) {
      clearCurrent();
    }

    if(user) {
      getTickets();
    }
    // eslint-disable-next-line
  }, []);

  const [sort, setSort] = useState({
    isSorted: false,
    column: null,
    order: null
  })

  const { isSorted, column, order } = sort;
  let sortBy = null;

  const onSetField = async e => {
    e.preventDefault();
    sortBy = document.getElementById(e.target.id).getAttribute("data_sort");
    await setSort({ isSorted: true, column: sortBy, order: 'desc'});
    onSort(sortBy);
  }

  const onSort = async column => {
    if(isSorted) {
      if(order === null || order === 'asc') {
        setSort({ 
          ...sort,
          column: sortBy,
          order: 'desc'
        })
        sortTickets(column, order);
      } else {
        setSort({ 
          ...sort,
          column: sortBy,
          order: 'asc'
        })
        sortTickets(column, order);
      }
    } else {
      setSort({ 
        isSorted: true,
        column: sortBy,
        order: 'desc'
      })
      sortTickets(column, order);
    }
  }

  if(tickets !== null && tickets.length === 0 && !loading) {
    return <h4>There are no tickets yet. Create one.</h4>
  }
  return (
    <Fragment>
      <div id="tickets" className="card-panel">
        <table className="striped">
          <thead>
            <tr>
                <th className="ticket-info center">
                  <a href="#!" id="sortById" data_sort="_id" onClick={onSetField}>
                    # ID {' '}
                    {!isSorted && column === sortBy ? (
                      <i className="fas fa-sort"></i>
                    ) : (
                      <Fragment>
                        {isSorted && order === 'desc' ? (
                          <i className="fas fa-sort-up" data_sort="_id"></i>
                        ) : (
                          <i className="fas fa-sort-down" data_sort="_id"></i>
                        )}
                      </Fragment>
                    )}
                  </a>
                </th>
                <th className="ticket-info center">Alert</th>
                <th className="ticket-info center">Status</th>
                <th className="ticket-info center">
                  Subject
                </th>
                <th className="ticket-info center">
                  Issued By
                </th>
                <th className="ticket-info center">Priority</th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByDate" data_sort="dateIssued" onClick={onSetField}>
                    Date Issued {' '}
                    {!isSorted && column === sortBy ? (
                      <i className="fas fa-sort"></i>
                    ) : (
                      <Fragment>
                        {isSorted && order === 'desc' ? (
                          <i className="fas fa-sort-up" data_sort="dateIssued"></i>
                        ) : (
                          <i className="fas fa-sort-down" data_sort="dateIssued"></i>
                        )}
                      </Fragment>
                    )}
                  </a>
                </th>
                <th className="ticket-info center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets !== null && !loading ? 
            (
              <Fragment>
                {filtered !== null || sorted !== null ? 
                (
                  // If filtered not null
                  <Fragment>
                  {filtered !== null && sorted === null ? 
                    filtered.map(ticket => (
                      <TicketItem key={ticket._id} ticket={ticket} />
                    ))
                    :
                    sorted.map(ticket => (
                      <TicketItem key={ticket._id} ticket={ticket} />
                    ))
                  }
                  </Fragment>
                ) 
                : tickets.map(ticket => (
                  <TicketItem key={ticket._id} ticket={ticket} />
                ))}
              </Fragment>
            ) : (
              <tr>
                <td>
                  <PreLoader key='loader'/>
                </td>
              </tr>
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
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  current: state.ticket.current,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  loading: state.ticket.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getTickets, sortTickets, clearCurrent })(Tickets);