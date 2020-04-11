import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getTickets, setOwnedTickets, setAssignedTickets, setCurrent, setSort, sortTicketsProfile, resetSort } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Profile = ({ user, tickets, owned, assigned, sorted, sorting, getTickets, setOwnedTickets, setAssignedTickets, setCurrent, setSort, sortTicketsProfile, resetSort }) => {
  const [activeTab, setActiveTab] = useState('#profile');
  const [ownedTickets, setOwned] = useState({
    open: null,
    pending: null,
    closed: null
  });
  const [assignedTickets, setAssigned] = useState({
    open: null,
    pending: null,
    closed: null
  });

  const { isSorted, order } = sorting;
  let sortBy = null;

  useEffect(() => {
    M.AutoInit();

    if(sorted !== null) {
      resetSort();
    }

    if(!tickets && user) {
      getTickets();
    }

    if(tickets && user && user.userType === 'employee' && owned === null) {
      setOwnedTickets(user._id);
    }

    if(tickets && user && user.userType === 'technician' && assigned === null) {
      setAssignedTickets(user._id);
    }

    if(owned) {
      setOwned({
        open: owned.filter(ticket => ticket.status === 'open').length,
        pending: owned.filter(ticket => ticket.status === 'pending').length,
        closed: owned.filter(ticket => ticket.status === 'closed').length
      });
    } 
    
    if(assigned) {
      setAssigned({
        open: assigned.filter(ticket => ticket.status === 'open').length,
        pending: assigned.filter(ticket => ticket.status === 'pending').length,
        closed: assigned.filter(ticket => ticket.status === 'closed').length
      });
    }  
    // eslint-disable-next-line
  }, [user, tickets, assigned, owned]);

  const emp_headers = [
    { 
      label: '#',
      id: 'sortById',
      data_sort: '_id'
    }, 
    { 
      label: 'Alert',
      id: 'sortByAlertLevel',
      data_sort: 'alertLevel'
    },
    { 
      label: 'Status',
      id: 'sortByStatus',
      data_sort: 'status'
    },
    { 
      label: 'Subject',
      id: 'sortByTitle',
      data_sort: 'title'
    },
    { 
      label: 'Assigned To',
      id: 'sortByAssignedTo',
      data_sort: 'assignedTo'
    },
    { 
      label: 'Priority',
      id: 'sortByPriorityLevel',
      data_sort: 'priorityLevel'
    },
    { 
      label: 'Date Issued',
      id: 'sortByDateIssued',
      data_sort: 'dateIssued'
    }
  ];

  const tech_headers = [
    { 
      label: '#',
      id: 'sortById',
      data_sort: '_id'
    }, 
    { 
      label: 'Alert',
      id: 'sortByAlertLevel',
      data_sort: 'alertLevel'
    },
    { 
      label: 'Status',
      id: 'sortByStatus',
      data_sort: 'status'
    },
    { 
      label: 'Subject',
      id: 'sortByTitle',
      data_sort: 'title'
    },
    { 
      label: 'Issued By',
      id: 'sortByIssuedBy',
      data_sort: 'issuedBy'
    },
    { 
      label: 'Priority',
      id: 'sortByPriorityLevel',
      data_sort: 'priorityLevel'
    },
    { 
      label: 'Date Issued',
      id: 'sortByDateIssued',
      data_sort: 'dateIssued'
    }
  ];

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

  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
  }

  const profile = (
    <div id="profile" className="col s12 collection with-header">
      <div className="collection-header">
        <h5 style={styles.header} >Profile</h5> 
      </div>
      <div className="collection-item avatar">
        <i className="circle grey lighten-2 z-depth-2">
          <FontAwesomeIcon icon="user" className={user.userType !== "employee" ? "indigo-text text-darken-2" : "cyan-text text-darken-1"} />
        </i>  
        {/* First Name */}
        <span className="grey-text" style={styles.label}> First Name : </span>
        <span style={styles.name}> { user.firstName }  </span> <br/>
        {/* Last Name */}
        <span className="grey-text" style={styles.label}> Last Name : </span>
        <span style={styles.name}> { user.lastName }  </span> <br/>
        {/* Email */}
        <span className="grey-text" style={styles.label}> Email : </span> 
        <span className="blue-text" style={styles.email}> { user.email } </span> <br/> 
        {/* User Type */}
        <span className="grey-text" style={styles.label}> User Type : </span>
        {user.userType !== 'employee' ? (
          <span className="indigo-text text-darken-2" style={styles.userType}> { user.userType } </span>
        ) : (
          <span className="cyan-text text-darken-1" style={styles.userType}> { user.userType } </span>
        )}    
      </div>
    </div>
  );

  const myTickets = (
    <div id="my-tickets" className="col s12 collection with-header">
      {/* Owned/Assigned Tickets */}
      <div className="collection-header">
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
        <div className="center">
          {/* Open Tickets */}
          <span className="green-text text-darken-2" style={styles.ticket_label}> open </span>
          <span style={styles.label}> [ { assigned ? assignedTickets.open : ownedTickets.open } ] </span> {' - '}
          {/* Pending Tickets */}
          <span className="orange-text text-darken-2" style={styles.ticket_label}> pending </span>
          <span style={styles.label}> [ { assigned ? assignedTickets.pending : ownedTickets.pending } ]  </span> {' - '}
          {/* Closed Tickets */}
          <span className="grey-text text-darken-2" style={styles.ticket_label}> closed </span>
          <span style={styles.label}> [ { assigned ? assignedTickets.closed : ownedTickets.closed } ] </span> 
        </div>
        <br/>
        {/* tickets */}
        <table className="responsive-table striped">
          <thead>
            <tr className="ticket-info">
              {assigned ? tech_headers.map(header => (
                <th className="center" key={header.id}> 
                  <a href="#!" id={header.id} data_sort={header.data_sort} onClick={onSetField}>
                    {header.label} {' '}
                  </a>
                  {!sorting.isSorted && sorting.field === null ? (
                    <FontAwesomeIcon icon="sort"/>
                  ) : (
                    <Fragment>
                      {sorting.isSorted && sorting.order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
              )) : emp_headers.map(header => (
                <th className="center" key={header.id}> 
                  <a href="#!" id={header.id} data_sort={header.data_sort} onClick={onSetField}>
                    {header.label} {' '}
                  </a>
                  {!sorting.isSorted && sorting.field === null ? (
                    <FontAwesomeIcon icon="sort"/>
                  ) : (
                    <Fragment>
                      {sorting.isSorted && sorting.order === 'desc' ? (
                        <FontAwesomeIcon icon="sort-up" />
                      ) : (
                        <FontAwesomeIcon icon="sort-down" />
                      )}
                    </Fragment>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assigned && assigned.map(ticket => (
              <tr key={ticket._id}>
                <td className="ticket-info center">
                  {ticket._id}
                </td>
                <td className="ticket-info center">
                  {(ticket.priority === 'low') && (
                    <span className="alert-badge grey"></span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="alert-badge green"></span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="alert-badge red"></span>
                  )}
                </td>
                <td className="ticket-info center">
                  {(ticket.status === 'open') && (
                    <span className="chip grey lighten-3 green-text text-darken-2">{ticket.status}</span>
                  )}
                  {(ticket.status === 'pending') && (
                    <span className="chip grey lighten-3 orange-text text-darken-3">{ticket.status}</span>
                  )}
                  {(ticket.status === 'closed') && (
                    <span className="chip grey lighten-3 text-darken-2">{ticket.status}</span>
                  )}
                </td>
                <td>
                  <Link to={`/tickets/${ticket._id}`} className="ticket-details blue-text text-darken-2">
                    <span className="truncate">{ticket.title}</span>
                  </Link>  
                </td>
                <td className="ticket-info">
                  {ticket.issuedBy.firstName} {ticket.issuedBy.lastName}
                </td>
                <td className="ticket-info center">
                  {(ticket.priority === 'low') && (
                    <span className="priority-badge grey-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="priority-badge green-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="priority-badge red-text text-darken-2">{ticket.priority}</span>
                  )}
                </td>
                <td className="ticket-info center">
                  <Moment format="MM-DD-YYYY, ">
                  {ticket.createdAt} 
                  </Moment>
                  <span> at </span>
                  <Moment format="hh:mm A">
                  {ticket.createdAt} 
                  </Moment>
                </td>
              </tr>
            ))}

            {owned && owned.map(ticket => (
              <tr key={ticket._id}>
                <td className="ticket-info center">
                  {ticket._id}
                </td>
                <td className="ticket-info center">
                  {(ticket.priority === 'low') && (
                    <span className="alert-badge grey"></span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="alert-badge green"></span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="alert-badge red"></span>
                  )}
                </td>
                <td className="ticket-info center">
                  {(ticket.status === 'open') && (
                    <span className="chip grey lighten-3 green-text text-darken-2">{ticket.status}</span>
                  )}
                  {(ticket.status === 'pending') && (
                    <span className="chip grey lighten-3 orange-text text-darken-3">{ticket.status}</span>
                  )}
                  {(ticket.status === 'closed') && (
                    <span className="chip grey lighten-3 text-darken-2">{ticket.status}</span>
                  )}
                </td>
                <td>
                  <Link to={`/tickets/${ticket._id}`} className="ticket-details blue-text text-darken-2">
                    <span className="truncate">{ticket.title}</span>
                  </Link>  
                </td>
                <td className="ticket-info">
                  {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
                </td>
                <td className="ticket-info center">
                  {(ticket.priority === 'low') && (
                    <span className="priority-badge grey-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="priority-badge green-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="priority-badge red-text text-darken-2">{ticket.priority}</span>
                  )}
                </td>
                <td className="ticket-info center">
                  <Moment format="MM-DD-YYYY, ">
                  {ticket.createdAt} 
                  </Moment>
                  <span> at </span>
                  <Moment format="hh:mm A">
                  {ticket.createdAt} 
                  </Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) 

  // const accountSettings = (
  //   <div id="account-settings" className="col s12 collection with-header">
  //     <div className="collection-header center">
  //       <h5 style={styles.header} >Account Settings</h5> 
  //     </div>
  //     <div className="collection-item">
  //       {/* Change Name */}
  //       <span style={styles.subHeader}> Change Name </span>
  //       <br/>
  //       <div className="row">
  //         <form>
  //           <div className="form-group col s12 m5 l3">
  //             <label htmlFor="firstName">First Name</label>
  //             <input type="text" name="firstName" defaultValue={user.firstName} required/>
  //           </div>
  //           <div className="form-group col s12 m5 l3">
  //             <label htmlFor="lastName">Last Name</label>
  //             <input type="text" name="lastName" defaultValue={user.lastName} required/>
  //           </div>
  //           <div className="col s12 m2 l2">
  //             <br/>
  //             <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Confirm"/>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <div className="collection-item">
  //       {/* Change Password */}
  //       <span style={styles.subHeader}> Change Password </span>
  //       <div className="row">
  //         <form>
  //           <div className="form-group col s12 m3">
  //             <label htmlFor="currentPass">Current Password</label>
  //             <input type="password" name="currentPass" required/>
  //           </div>
  //           <div className="form-group col s12 m3">
  //             <label htmlFor="newPass">New Password</label>
  //             <input type="password" name="newPass" required/>
  //           </div>
  //           <div className="form-group col s12 m3">
  //             <label htmlFor="confirmPass">Confirm Password</label>
  //             <input type="password" name="confirmPass" required/>
  //           </div>
  //           <div className="col s12 m2">
  //             <br/>
  //             <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Confirm"/>
  //           </div>
  //         </form>
  //       </div>
  //     </div>

  //     <div className="collection-item">
  //       {/* Change Email */}
  //       <span style={styles.subHeader}> Change Email</span> 
  //       <div className="row">
  //         <form>
  //           <div className="form-group col s12 m5">
  //             <label htmlFor="email">Current Email</label>
  //             <input type="email" name="email" defaultValue={user.email} required/>
  //           </div>
  //           <div className="form-group col s12 m5">
  //             <label htmlFor="newEmail">New Email</label>
  //             <input type="email" name="newEmail" required/>
  //           </div>
  //           <div className="col s12 m2">
  //             <br/>
  //             <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Confirm"/>
  //           </div>
  //         </form>
  //       </div>
  //     </div>

  //     <div className="collection-item center">
  //       {/* Delete Account */}
  //       <span className="btn-small red darken-2" style={styles.btn}>Delete Account</span>
  //     </div>
  //   </div>
  // )

  return (
    <div className="row card-panel">
      {user && tickets && (assigned || owned) && (
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col">
              <a className="active" href="#profile" onClick={setActive} >Profile</a>
              </li>
            <li className="tab col">
              <a className="active" href="#my-tickets" onClick={setActive} >
              {user && user.userType !== 'employee' ? (
                <Fragment>
                  Assigned Tickets
                </Fragment>
              ) : (
                <Fragment>
                  My Tickets
                </Fragment>
              )}
              </a>
            </li>
          </ul>
          <div className="row">
            {activeTab !== '#profile' ? myTickets : profile }
          </div>
      </div> 
      )}
        
    </div>
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
  },
  subHeader: {
    fontSize: '1em',
    fontWeight: 'bold'
  },
  label : {
    fontSize: '0.82em'
  },
  ticket_label : {
    fontSize: '0.82em',
    fontWeight: 'bold'
  },
  name : {
    fontSize: '0.95em',
  },
  email : {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  userType: {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  btn: {
    textTransform: 'capitalize'
  }

}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  tickets: PropTypes.array,
  assigned: PropTypes.array,
  getTickets: PropTypes.func.isRequired,
  setOwnedTickets: PropTypes.func.isRequired,
  setAssignedTickets: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  sortTicketsProfile: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  tickets: state.ticket.tickets,
  owned: state.ticket.owned,
  assigned: state.ticket.assigned,
  sorted: state.ticket.sorted,
  sorting: state.ticket.sorting
});

export default connect(mapStateToProps, { getTickets, setOwnedTickets, setAssignedTickets, setCurrent, setSort, sortTicketsProfile, resetSort })(Profile);