import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TicketHeaders from './TicketHeaders';
import TicketItemTech from './TicketItemTech';
import TicketItemEmp from './TicketItemEmp';
import TicketFilters from './filters/TicketFilters';
import { setSort, sortTicketsProfile } from '../../../actions/ticketActions';
import PropTypes from 'prop-types';

const TicketsTab = ({ user, owned, assigned, filtered, sorting, setSort, sortTicketsProfile }) => {
  
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
    <div id="my-tickets" className="col s12 collection with-header">
      {/* Owned/Assigned Tickets */}
      <div className="collection-header">
        {/*  */}
        <h5 style={styles.header} >
          Tickets {' '}
          {assigned ? (
            <span className="grey-text" style={styles.label}>[{ assigned && assigned.length }]</span>
          ) : (
            <span className="grey-text" style={styles.label}>[{ owned && owned.length }]</span>
          )}
        </h5> 
      </div>
      <div className="collection-item">
        {/* Filters */}
          <TicketFilters />
        {/* Tickets Section*/}
        <table className="responsive-table striped">
          <thead>
            {/* Table Headers */}
            <TicketHeaders assigned={assigned} onSetField={onSetField} onSort={onSort}/>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Ticket Items for Technicians */}
            {!filtered ? (
              <Fragment>
                {assigned && !owned ? (
                  <Fragment>
                    {assigned.map(ticket => (
                      <TicketItemTech key={ticket._id} ticket={ticket} />
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {owned.map(ticket => (
                      <TicketItemEmp key={ticket._id} ticket={ticket} />
                    ))}
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
                  </Fragment>
                ) : (
                  <Fragment>
                    {filtered.map(ticket => (
                      <TicketItemEmp key={ticket._id} ticket={ticket} />
                    ))}
                  </Fragment>
                )}   
              </Fragment>
            )}
            
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
  },
  label : {
    fontSize: '0.82em'
  }
}

TicketsTab.propTypes = {
  user: PropTypes.object,
  tickets: PropTypes.array,
  filtered: PropTypes.array,
  assigned: PropTypes.array,
  sortTicketsProfile: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  filtered: state.ticket.filtered,
  sorted: state.ticket.sorted,
  sorting: state.ticket.sorting
});

export default connect(mapStateToProps, { setSort, sortTicketsProfile })(TicketsTab);