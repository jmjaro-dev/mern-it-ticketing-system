import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';
import { getTickets, sortTickets, clearCurrent } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Tickets = ({ user, current, tickets, mapped, sorted, filtered, loading, getTickets,  sortTickets, clearCurrent }) => {
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
    setSort({ isSorted: true, column: sortBy, order: 'asc'});
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
        sortTickets(column);
      } else {
        setSort({ 
          ...sort,
          column: sortBy,
          order: 'asc'
        })
        sortTickets(column);
      }
    } else {
      setSort({ 
        isSorted: true,
        column: sortBy,
        order: 'desc'
      })
      sortTickets(column);
    }
  }

  if(tickets !== null && tickets.length === 0 && !loading) {
    return <h4>There are no tickets yet. Create one.</h4>
  }
  return (
    <Fragment>
      <div id="tickets" className="card-panel">
        <table className="responsive-table striped">
          <thead>
            <tr>
                <th className="ticket-info center">
                  <a href="#!" id="sortById" data_sort="_id" onClick={onSetField}>
                    # ID {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByAlertLevel" data_sort="alertLevel" onClick={onSetField}>
                    Alert {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByStatus" data_sort="status" onClick={onSetField}>
                    Status {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByTitle" data_sort="title" onClick={onSetField}>
                    Subject {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByIssuedBy" data_sort="issuedBy" onClick={onSetField}>
                    IssuedBy {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByPriorityLevel" data_sort="priorityLevel" onClick={onSetField}>
                    Priority {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByDate" data_sort="dateIssued" onClick={onSetField}>
                    Date Issued {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
                <th className="ticket-info center">
                  <a href="#!" id="sortByAssigned" data_sort="assignedTo" onClick={onSetField}>
                    Assigned To {' '}
                  </a>
                  {!isSorted && column === sortBy ? (
                    <FontAwesomeIcon icon="sort" />
                  ) : (
                    <Fragment>
                      {isSorted && order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
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
            ) : (
              <tr>
                <td>
                  <PreLoader/>
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
  mapped: PropTypes.array,
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
  mapped: state.ticket.mapped,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  loading: state.ticket.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getTickets, sortTickets, clearCurrent })(Tickets);