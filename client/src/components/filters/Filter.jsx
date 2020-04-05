import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Filter = ({ filter, tickets, user_id, setFilter }) => {
  const setActive = e => {
    e.preventDefault();
    // Gets UL element children
    const links = e.target.parentElement.parentElement.children;
    // Current clicked link
    const current = e.target.innerText;
    // Adding/Removing 'active' class from element
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].firstChild.classList.remove('active');
      } else {
        links[index].firstChild.classList.add('active');
      }
    }
  }

  const onSetFilter = (e, filter) => {
    e.preventDefault();
    // Sets active link
    setActive(e);
    // Assigns link's text to filter
    filter = e.target.innerText;
    let arr = [];
    // Set filter depending on 'filter' value
    switch(filter) {
      case "All Tickets":
        setFilter(filter, tickets);
        break;
      case "My Tickets": 
        arr = tickets.filter(ticket => {
          return user_id === ticket.issuedBy._id;
        })
        setFilter(filter, arr);
        break;
      case "Assigned To Me":
        arr = tickets.filter(ticket => {
          return user_id === ticket.assignedTo._id;
        })
        setFilter(filter, arr);
        break;
      case "Unassigned":
        arr = tickets.filter(ticket => {
          return ticket.assignedTo.to === 'Unassigned';
        })
        setFilter(filter, arr);
        break;
      case "Open":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        break;
      case "Pending":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        break;
      case "Closed":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        break;
      default:
        setFilter(filter, tickets);
    }
  }

  return (
    <Fragment>
      {(filter !== 'technician' && filter !== 'employee') ? (
        <Fragment>
        {filter !== 'All Tickets' ? (
          <li>
              <a href="#!" className="chip" onClick={onSetFilter}>
                {filter} {' '}
              </a>
            </li>
        ) : (
          <li>
            <a href="#!" className="chip active" onClick={onSetFilter}>
              {filter} {' '}
            </a>
          </li>
        )}
        </Fragment>
      ) : (
        <li>
          <a href="#!" className="chip" onClick={onSetFilter}>
            {filter !== 'employee' ? (
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
        </li>   
      )}
  </Fragment>
  )
}

Filter.propTypes = {
  user_id: PropTypes.string.isRequired,
  Tickets: PropTypes.array,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user_id: state.auth.user._id,
  tickets: state.ticket.tickets,
});

export default connect(mapStateToProps, { setFilter })(Filter);
