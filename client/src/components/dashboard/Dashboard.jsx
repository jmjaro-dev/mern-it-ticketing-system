import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateBtn from '../layout/CreateBtn';
import UnassignedTab from './unassignedTab/UnassignedTab';
import TicketsTab from './ticketsTab/TicketsTab';
import { setPreviousUrl } from '../../actions/authActions';
import { getTickets, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists,  setOwnedTickets, setAssignedTickets, setUnassignedTickets } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.js';

const Dashboard = ({ user, tickets, current, current_ticket_exists, active_filter, previousUrl, setPreviousUrl, loading, owned, assigned, unassigned, getTickets, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists, setOwnedTickets, setAssignedTickets, setUnassignedTickets }) => {
  const [activeTab, setActiveTab] = useState('#tickets');
  const [ticketCounter, setTicketCounter] = useState({
    totalOwned: null,
    totalAssigned: null,
    totalUnassigned: null
  });
  // const [current_ticket, setCurrentTicket] = useState('');
  const { totalOwned , totalAssigned, totalUnassigned } = ticketCounter;

  let current_ticket = JSON.parse(localStorage.getItem('currentTicket')); 

  useEffect(() => {
    M.AutoInit();

    if(user && !current && current_ticket && !loading) {
      setCurrent(current_ticket, 'dashboard');
      setTicketExists(true);
      setCurrentTicketExists();
    }

    if(user && current && current_ticket && !loading) {
      setTicketExists(false);
      clearCurrentTicketExists();
      localStorage.removeItem('currentTicket');
    }

    if((previousUrl === null || previousUrl !== window.location.pathname) && !current_ticket){
      setPreviousUrl(window.location.pathname);
    }

    if(!tickets && user) {
      getTickets();
    }

    if(tickets && user && !unassigned) {
      setUnassignedTickets(user._id, user.userType);
      setTicketCounter({
        ...ticketCounter,
        totalUnassigned: tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned').length
      })
    }

    // Updates the Unassigned Tickets when employee adds/deletes and unassigned ticket
    if(tickets && user && user.userType === 'employee' && unassigned && totalUnassigned !== null && unassigned.length !== totalUnassigned) {
      setUnassignedTickets(user._id, user.userType);
      setTicketCounter({
        ...ticketCounter,
        totalUnassigned: tickets.filter(ticket => ticket.issuedBy._id === user._id && ticket.assignedTo.to === 'Unassigned').length
      })
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
      {user && current && current.ticket && current_ticket && current_ticket_exists && !loading && (
        <Redirect to={`/tickets/${current_ticket._id}`} />
      )} 
      <CreateBtn user={user} />
      {user && tickets && unassigned && (assigned || owned) && !loading && (
        <div className="row card-panel">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col">
                <a className="active" href="#tickets" onClick={setActive} >
                {user && user.userType !== 'employee' ? (
                  <Fragment>
                    Assigned ({ assigned.length })
                  </Fragment>
                ) : (
                  <Fragment>
                    My Tickets ({ owned.length })
                  </Fragment>
                )}
                </a>
              </li>
              <li className="tab col">
                <a href="#unassigned" onClick={setActive} >Unassigned ({ unassigned.length })</a>
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
  current: PropTypes.object,
  curent_ticket_exists: PropTypes.bool,
  tickets: PropTypes.array,
  active_filter: PropTypes.string.isRequired,
  assigned: PropTypes.array,
  owned: PropTypes.array,
  unassigned: PropTypes.array,
  sorting: PropTypes.object,
  previousUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  getTickets: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired, 
  setTicketExists: PropTypes.func.isRequired,
  setCurrentTicketExists: PropTypes.func.isRequired, 
  clearCurrentTicketExists: PropTypes.func.isRequired,
  setPreviousUrl: PropTypes.func.isRequired,
  setOwnedTickets: PropTypes.func.isRequired,
  setAssignedTickets: PropTypes.func.isRequired,
  setUnassignedTickets: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  user: state.auth.user,
  current: state.ticket.current,
  current_ticket_exists: state.ticket.current_ticket_exists,
  active_filter: state.ticket.active_filter_dashboard,
  owned: state.ticket.owned,
  assigned: state.ticket.assigned,
  unassigned: state.ticket.unassigned,
  sorting: state.ticket.sorting,
  previousUrl: state.auth.previousUrl,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, { getTickets, setCurrent, setTicketExists, setCurrentTicketExists, clearCurrentTicketExists, setPreviousUrl, setOwnedTickets, setAssignedTickets, setUnassignedTickets })(Dashboard);