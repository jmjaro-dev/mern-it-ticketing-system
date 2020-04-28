import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileTab from './profileTab/ProfileTab';
import TicketsTab from './ticketsTab/TicketsTab';
import { getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.js';

const Profile = ({ user, tickets, loading, owned, assigned, sorted, filtered, getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter }) => {
  const [activeTab, setActiveTab] = useState('#my-tickets');
  const [currTickets, setCurrTickets] = useState(null);
  const [tabInstance, setTabInstance] = useState(null);
  useEffect(() => {
    M.AutoInit();
    
    if(sorted !== null) {
      resetSort();
    }

    if(filtered !== null && currTickets !== tickets.length) {
      clearFilter();
    }

    if(!tickets && user) {
      getTickets();
    }

    if(tickets !== null) {
      setCurrTickets(tickets.length);
    }

    if(tickets && user.userType === 'employee' && owned === null) {
      setOwnedTickets(user._id);
    }

    if(tickets && user.userType === 'employee' && owned && currTickets !== tickets.length) {
      setOwnedTickets(user._id);
    }

    if(tickets && user.userType === 'technician' && assigned === null) {
      setAssignedTickets(user._id);
    }

    if(tickets && user.userType === 'technician' && assigned && currTickets !== tickets.length) {
      setAssignedTickets(user._id);
    }

    if(user && tickets && (assigned || owned) && !loading) {
      let elem = document.querySelector('.tabs');
      let instance = M.Tabs.getInstance(elem);
      setTabInstance(instance);
    }
    // eslint-disable-next-line
  }, [user, tickets, loading, assigned, owned]);

  
  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
    tabInstance.updateTabIndicator();
  }

  return (
    <Fragment>
      {user && tickets && (assigned || owned) && !loading && (
        <div className="row card-panel">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col">
                <a className="active" href="#my-tickets" onClick={setActive} >
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
                <a href="#profile" onClick={setActive} >Profile</a>
              </li>
            </ul>
            <div className="row">
              {activeTab !== '#my-tickets' ? 
                <ProfileTab user={user} /> 
                : 
                <TicketsTab user={user} owned={owned} assigned={assigned} /> 
              }
            </div>
          </div>
        </div>
        )}
    </Fragment>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  tickets: PropTypes.array,
  assigned: PropTypes.array,
  owned: PropTypes.array,
  sorting: PropTypes.object,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getTickets: PropTypes.func.isRequired,
  setOwnedTickets: PropTypes.func.isRequired,
  setAssignedTickets: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  user: state.auth.user,
  owned: state.ticket.owned,
  assigned: state.ticket.assigned,
  sorted: state.ticket.sorted,
  filtered: state.ticket.filtered,
  sorting: state.ticket.sorting,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, { getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter })(Profile);