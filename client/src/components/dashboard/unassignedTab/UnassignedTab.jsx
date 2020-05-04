import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import TicketHeaders from './TicketHeaders';
import TicketItemTech from './TicketItemTech';
import TicketItemEmp from './TicketItemEmp';
import { setSort, sortTicketsProfile, clearFilter } from '../../../actions/ticketActions';
import PropTypes from 'prop-types';

const UnassignedTab = ({ user, activeTab, tickets, unassigned, loading, owned, assigned, filtered, sorting, setSort, sortTicketsProfile, clearFilter }) => {
  const { isSorted, order } = sorting;
  let sortBy = null;

  useEffect(() => {
    if(activeTab === '#unassigned') {
      clearFilter();
    }
    // eslint-disable-next-line
  }, [activeTab]);

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
        sortTicketsProfile(field, user.userType);
      } else {
        setSort({ 
          ...sorting,
          field: sortBy,
          order: 'asc'
        })
        sortTicketsProfile(field, user.userType);
      }
    } else {
      setSort({ 
        isSorted: true,
        field: sortBy,
        order: 'desc'
      })
      sortTicketsProfile(field, user.userType);
    }
  }

  return (
    <Fragment>
      {user && tickets && unassigned && !loading && (
        <div id="my-tickets" className="col s12 collection with-header">
          {/* Owned/Assigned Tickets */}
          <div className="collection-header" style={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}>
            <span style={styles.header} >
              Unassigned Tickets {' '}
                <span className="grey-text" style={styles.label}>[{ unassigned.length }]</span>
            </span>
          </div>
          <div className="collection-item">
            {/* Tickets Section*/}
            <table className="responsive-table striped">
              {tickets && unassigned && unassigned.length !== 0 && (
                <thead>
                  {/* Table Headers */}
                  <TicketHeaders tickets={tickets} userType={user.userType} onSetField={onSetField} onSort={onSort}/>
                </thead>
              )}
              {/* Table Body */}
              <tbody>
                {/* Ticket Items for Technicians */}
                {!filtered ? (
                  <Fragment>
                    {( unassigned && unassigned.length === 0 ) ? (
                      <tr>
                        <td className="center" colSpan="9">
                          There are no <span style={styles.emphasized}>Unassigned</span> tickets.
                        </td>
                      </tr>
                    ) : (
                      <Fragment>
                        {user.userType !== 'employee' ? (
                          <Fragment>
                            {unassigned.map(ticket => (
                              <TicketItemTech key={ticket._id} ticket={ticket} />
                            ))}
                          </Fragment>
                        ) : (
                          <Fragment>
                            {unassigned.map(ticket => (
                              <TicketItemEmp key={ticket._id} ticket={ticket} />
                            ))}
                          </Fragment>
                        )}  
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    {user.userType !== 'employee' ? (
                      <Fragment>
                        {filtered.map(ticket => (
                          <TicketItemTech key={ticket._id} ticket={ticket} />
                        ))}

                        {filtered.length === 0 && (
                          <tr>
                            <td className="center" colSpan="9">
                              There are no <span style={styles.emphasized}>Unassigned</span> tickets.
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filtered.map(ticket => (
                          <TicketItemEmp key={ticket._id} ticket={ticket} />
                        ))}

                        {filtered !== null && filtered.length === 0 && (
                          <tr>
                            <td className="center" colSpan="9">
                              There are no <span style={styles.emphasized}>Unassigned</span> tickets.
                            </td>
                          </tr>
                        )}
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

UnassignedTab.propTypes = {
  user: PropTypes.object,
  tickets: PropTypes.array,
  active_filter: PropTypes.string,
  filtered: PropTypes.array,
  sorting: PropTypes.object,
  assigned: PropTypes.array,
  loading: PropTypes.bool,
  sortTicketsProfile: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  owned: state.ticket.owned,
  assigned: state.ticket.assigned,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  active_filter: state.ticket.active_filter_profile,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, { setSort, sortTicketsProfile, clearFilter })(UnassignedTab);