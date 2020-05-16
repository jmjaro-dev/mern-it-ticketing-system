import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketHeaders from './TicketHeaders';
import TicketItemTech from './TicketItemTech';
import TicketItemEmp from './TicketItemEmp';
import TicketFilters from './filters/TicketFilters';
import { setSort, sortTicketsDashboard, resetSort } from '../../../actions/ticketActions';
import PropTypes from 'prop-types';

const TicketsTab = ({ user, active_filter, loading, tickets, owned, assigned, filtered, sorting, setSort, sortTicketsDashboard, resetSort }) => {
  const { isSorted, order } = sorting;
  let sortBy = null;

  useEffect(() => {
    resetSort();
    // eslint-disable-next-line
  }, []);

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
        sortTicketsDashboard(field, user.userType);
      } else {
        setSort({ 
          ...sorting,
          field: sortBy,
          order: 'asc'
        })
        sortTicketsDashboard(field, user.userType);
      }
    } else {
      setSort({ 
        isSorted: true,
        field: sortBy,
        order: 'desc'
      })
      sortTicketsDashboard(field, user.userType);
    }
  }

  return (
    <Fragment>
      {user && tickets && (owned || assigned) && !loading && (
        <div id="my-tickets" className="col s12 collection with-header">
          {/* Owned/Assigned Tickets */}
          <div className="collection-header" style={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}>
            <span style={styles.header} >
              {user && user.userType !== 'employee' ? 'Assigned Tickets' : 'My Tickets'} 
              {' '}
              {tickets && user && user.userType !== 'employee' ? (
                <span className="grey-text" style={styles.label}>[{ assigned && assigned.length }]</span>
              ) : (
                <span className="grey-text" style={styles.label}>[{ owned && owned.length }]</span>
              )}
            </span>
          </div>
          <div className="collection-item">
            {/* Filters */}
            <TicketFilters />
            {/* Tickets Section*/}
            <table className="responsive-table striped">
              {tickets && (owned || assigned) && filtered && filtered.length !== 0 && (
                <thead>
                  {/* Table Headers */}
                  <TicketHeaders tickets={tickets} userType={user.userType} onSetField={onSetField} />
                </thead>
              )}
              {/* Table Body */}
              <tbody>
                {/* Ticket Items for Technicians */}
                {filtered && (
                  <Fragment>
                    {user.userType !== 'employee' ? (
                      <Fragment>
                        {filtered.map(ticket => (
                          <TicketItemTech key={ticket._id} ticket={ticket} />
                        ))}

                        {filtered.length === 0 && (
                          <Fragment>
                            {active_filter !== 'all' ? (
                              <tr>
                                <td className="center" colSpan="9">
                                  <p>There are no <span style={styles.emphasized}>{active_filter}</span> tickets.</p>
                                </td>
                              </tr>
                            ) : (
                              <Fragment>
                                {user && user.userType === 'technician' && assigned.length === 0 && (
                                  <tr>
                                    <td className="center" colSpan="9">
                                      <p>There are no tickets assigned to you.</p>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            )}
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filtered.map(ticket => (
                          <TicketItemEmp key={ticket._id} ticket={ticket} />
                        ))}

                        {filtered.length === 0 && (
                          <Fragment>
                            {active_filter !== 'all' ? (
                              <tr>
                                <td className="center" colSpan="9">
                                  <p>There are no <span style={styles.emphasized}>{active_filter}</span> tickets.</p>
                                </td>
                              </tr>
                            ) : (
                              <Fragment>
                                {user && user.userType === 'employee' && owned.length === 0 && (
                                  <tr>
                                    <td className="center" colSpan="9">
                                      <p>You don't have any tickets yet.</p>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            )}
                          </Fragment>
                        )}

                        {/* {filtered !== null && filtered.length === 0 && active_filter !== 'all' ? (
                          <tr>
                            <td className="center" colSpan="9">
                              <p>There are no <span style={styles.emphasized}>{active_filter}</span> tickets.</p>
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td className="center" colSpan="9">
                              <p>There are no tickets yet.</p>
                            </td>
                          </tr>
                        )} */}
                      </Fragment>
                    )}   
                  </Fragment>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
  },
  label : {
    fontSize: '0.82em'
  },
  emphasized: {
    fontWeight: '500'
  }
}

TicketsTab.propTypes = {
  user: PropTypes.object,
  tickets: PropTypes.array,
  active_filter: PropTypes.string,
  filtered: PropTypes.array,
  sorting: PropTypes.object,
  owned: PropTypes.array,
  assigned: PropTypes.array,
  loading: PropTypes.bool,
  sortTicketsDashboard: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  active_filter: state.ticket.active_filter_dashboard,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, { setSort, sortTicketsDashboard, resetSort })(TicketsTab);