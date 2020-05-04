import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CreateBtn from '../layout/CreateBtn';
import UnassignedTab from './unassignedTab/UnassignedTab';
import TicketsTab from './ticketsTab/TicketsTab';
import { getTickets, setOwnedTickets, setAssignedTickets, setUnassignedTickets, resetSort } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.js';

const Dashboard = ({ user, tickets, active_filter, loading, owned, assigned, unassigned, sorted, filtered, getTickets, setOwnedTickets, setAssignedTickets, setUnassignedTickets, resetSort }) => {
  const [activeTab, setActiveTab] = useState('#tickets');
  const [ticketCounter, setTicketCounter] = useState({
    totalOwned: null,
    totalAssigned: null,
    totalUnassigned: null
  });
  
  const { totalOwned , totalAssigned, totalUnassigned } = ticketCounter;

  useEffect(() => {
    M.AutoInit();
    
    if(sorted !== null) {
      resetSort();
    }

    if(!tickets && user) {
      getTickets();
    }

    if(tickets && user && (owned || assigned) && unassigned && totalAssigned && unassigned.length !== totalUnassigned) {
      setUnassignedTickets(user._id, user.userType);
      setTicketCounter({
        ...ticketCounter,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      })
    }

    // Call setOwnedTickets IF !owned
    if(tickets && user && user.userType === 'employee' && !owned ) {
      setOwnedTickets(user._id);
      setTicketCounter({
        ...ticketCounter,
        totalOwned: tickets.filter(ticket => ticket.issuedBy._id === user._id).length,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      }); 
    }

    // Update Owned Tickets IF there are changes
    if(tickets && user && user.userType === 'employee' && owned && owned.length !== totalOwned) {
      setOwnedTickets(user._id);
      setTicketCounter({
        ...ticketCounter,
        totalOwned: tickets.filter(ticket => ticket.issuedBy._id === user._id).length,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      }); 
    }

    // Call setAssignedTickets IF !owned
    if(tickets && user && user.userType === 'technician' && !assigned ) {
      setAssignedTickets(user._id);
      setTicketCounter({
        ...ticketCounter,
        totalAssigned: tickets.filter(ticket => ticket.assignedTo._id === user._id).length,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      });
    }

    // Update Assigned Tickets IF there are changes
    if(tickets && user && user.userType === 'technician' && assigned && assigned.length !== totalAssigned) {
      setAssignedTickets(user._id);
      setTicketCounter({
        ...ticketCounter,
        totalAssigned: tickets.filter(ticket => ticket.assignedTo._id === user._id).length,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      });
    }
    // eslint-disable-next-line
  }, [user, tickets, active_filter, loading, owned, assigned, unassigned]);

  
  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
  }

  return (
    <Fragment>
      <CreateBtn user={user} />
      {user && tickets && unassigned && (assigned || owned) && !loading && (
        <div className="row card-panel">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col">
                <a className="active" href="#tickets" onClick={setActive} >
                {user && user.userType !== 'employee' ? (
                  <Fragment>
                    Assigned Tickets ({ assigned.length })
                  </Fragment>
                ) : (
                  <Fragment>
                    My Tickets ({ owned.length })
                  </Fragment>
                )}
                </a>
              </li>
              <li className="tab col">
                <a href="#unassigned" onClick={setActive} >Unassigned Tickets ({ unassigned.length })</a>
              </li>
            </ul>
            <div className="row">
              {activeTab !== '#tickets' ? 
                <UnassignedTab user={user} tickets={tickets} unassigned={unassigned} activeTab={activeTab} /> 
                : 
                <TicketsTab user={user} tickets={tickets} owned={owned} assigned={assigned} /> 
              }
            </div>
          </div>
        </div>
        )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  tickets: PropTypes.array,
  active_filter: PropTypes.string.isRequired,
  assigned: PropTypes.array,
  owned: PropTypes.array,
  unassigned: PropTypes.array,
  sorting: PropTypes.object,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getTickets: PropTypes.func.isRequired,
  setOwnedTickets: PropTypes.func.isRequired,
  setAssignedTickets: PropTypes.func.isRequired,
  setUnassignedTickets: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  user: state.auth.user,
  active_filter: state.ticket.active_filter_profile,
  owned: state.ticket.owned,
  assigned: state.ticket.assigned,
  unassigned: state.ticket.unassigned,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, { getTickets, setOwnedTickets, setAssignedTickets, setUnassignedTickets, resetSort })(Dashboard);