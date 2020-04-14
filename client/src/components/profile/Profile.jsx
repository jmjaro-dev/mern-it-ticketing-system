import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileTab from './profileTab/ProfileTab';
import TicketsTab from './ticketsTab/TicketsTab';
import { getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Profile = ({ user, tickets, owned, assigned, sorted, filtered, getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter }) => {
  const [activeTab, setActiveTab] = useState('#profile');
  
  useEffect(() => {
    M.AutoInit();

    if(sorted !== null) {
      resetSort();
    }

    if(filtered !== null ) {
      clearFilter();
    }

    if(!tickets && user) {
      getTickets()
    }

    if(tickets && user && user.userType === 'employee' && owned === null) {
      setOwnedTickets(user._id);
    }

    if(tickets && user.userType === 'technician' && assigned === null) {
      setAssignedTickets(user._id);
    }
    // eslint-disable-next-line
  }, [user, tickets]);

  
  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
  }

  return (
    <div className="row card-panel">
      {user && tickets && (assigned || owned) && (
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col">
              <a className="active" href="#profile" onClick={setActive} >Profile</a>
              </li>
            <li className="tab col">
              <a href="#my-tickets" onClick={setActive} >
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
          </ul>
          <div className="row">
            {activeTab !== '#profile' ? 
              <TicketsTab user={user} owned={owned} assigned={assigned} /> 
              : 
              <ProfileTab user={user} /> }
          </div>
      </div> 
      )}
        
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  tickets: PropTypes.array,
  assigned: PropTypes.array,
  owned: PropTypes.array,
  sorted: PropTypes.array,
  filtered: PropTypes.array,
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
  sorting: state.ticket.sorting
});

export default connect(mapStateToProps, { getTickets, setOwnedTickets, setAssignedTickets, resetSort, clearFilter })(Profile);