import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAll, ownedTickets, openTickets, resolvedTickets, closedTickets, filterTickets, clearFilter } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketFilters = ({ user, tickets, owned, setAll, ownedTickets, openTickets, resolvedTickets, closedTickets, filtered, loading, filterTickets, clearFilter }) => {
  const [text, setText] = useState('');

  const { userType } = user;

  const onSetAll = e => {
    e.preventDefault();
    setAll(tickets);
  }
  
  const setOwned = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return user._id === ticket.issuedBy._id;
    })
    ownedTickets(arr);
  }

  const setAssigned = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return user._id === ticket.assignedTo._id;
    })
    ownedTickets(arr);
  }

  const setUnassigned = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return ticket.assignedTo.to === 'Unassigned';
    })
    openTickets(arr);
  }

  const setOpen = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return ticket.status === 'open';
    })
    openTickets(arr);
  }

  const setResolved = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return ticket.status === 'resolved';
    })
    resolvedTickets(arr);
  }

  const setClosed = e => {
    e.preventDefault();
    let arr = tickets.filter(ticket => {
      return ticket.status === 'closed';
    })
    closedTickets(arr);
  }

  const onChange = e => {
    setText(e.target.value);
    filterTickets(text);   
    if(e.target.value === '') clearFilter();
  }
  
  const onCreate = async e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
    instance.open();
  }

  return (
    <div className="row card">
    {tickets && !loading && (
      <div id="sub-menu">
        <div className="col s7">
          <div className="ticket-details">
            <a href="#!" className="chip" onClick={onSetAll}>
              All Tickets {' '}
            </a>
            <a href="#!" className="chip" onClick={userType !== 'employee' ? setAssigned : setOwned }>
              {userType !== 'employee' ? (
                <Fragment>
                  Assigned To Me
                </Fragment> 
              ) : (
                <Fragment>
                  My Tickets
                </Fragment> 
              )}
              {' '}
            </a>
            <a href="#!" className="chip" onClick={setUnassigned}>
              Unassigned
            </a>
            <a href="#!" className="chip" onClick={setOpen}>
              Open
            </a>
            <a href="#!" className="chip" onClick={setResolved}>
              Pending
            </a>
            <a href="#!" className="chip" onClick={setClosed}>
              Closed
            </a>
          </div>
        </div>
        <div className="col s2 right-align">
          {userType !== 'employee' ? (
            <Fragment>
              {' '}
            </Fragment>
          ) : (
            <a href="#create-ticket-modal" className="nav-links btn-small right green" onClick={onCreate}>
              + New ticket
            </a>
          )}
          
        </div>
        <div className="col s3 valign-wrapper">
          <div className="col s1">
            <FontAwesomeIcon icon="search" className="blue-text" />  
          </div>
          <div className="col s11">
            <input name="text" type="text" placeholder="Search a Ticket..." onChange={onChange} value={text}/>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

TicketFilters.propTypes = {
  user: PropTypes.object,
  tickets: PropTypes.array,
  loading: PropTypes.bool,
  owned: PropTypes.array,
  filtered: PropTypes.array
}

const mapStateToProps = state => ({
  user: state.auth.user,
  tickets: state.ticket.tickets,
  loading: state.ticket.loading,
  owned: state.ticket.owned,
  filtered: state.ticket.filtered
});

export default connect(mapStateToProps, { setAll, ownedTickets, openTickets, resolvedTickets, closedTickets, filterTickets, clearFilter })(TicketFilters);