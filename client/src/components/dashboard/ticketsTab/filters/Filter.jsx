import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../../../actions/ticketActions';
import PropTypes from 'prop-types';

const Filter = ({ filter, user, tickets, ownedTickets, assignedTickets, active_filter, setFilter}) => {
  const [filterActivated, setFilterActivated] = useState(false);

  useEffect(() => {
    if(!filterActivated && active_filter !== filter && tickets) {
      onSetActiveFilter(active_filter);
      onSetActive(active_filter);
      setFilterActivated(true);
    }

    if(filterActivated && active_filter === filter && tickets) {
      onSetActiveFilter(active_filter);
      onSetActive(active_filter);
      setFilterActivated(true);
    }
    // eslint-disable-next-line
  }, [active_filter, tickets, window.location.pathname]);

  const onSetActive = filter => {
    // Gets UL element children
    let links = document.querySelectorAll("a.chip.filter");
    // Current active_filter
    const current = filter;
    // Adding/Removing 'active' class from element
    links.forEach(link => {
      if(link.innerText.slice(0, link.innerText.indexOf(' ')) !== current) {
        link.classList.remove('active');
        setFilterActivated(false);
      } else {
        link.classList.add('active');
      }
    })
  }

  const setActive = e => {
    e.preventDefault();
    // Gets UL element children
    let links;
    if(e.target.tagName === 'A') {
      links = e.target.parentElement.children;
    } else {
      links = e.target.parentElement.parentElement.children;
    }
    // Current clicked link
    const current = e.target.innerText.slice(0, e.target.innerText.lastIndexOf(' '));
    // Adding/Removing 'active' class from element
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].classList.remove('active');
      } else {
        links[index].classList.add('active');
      }
    }
  }

  const onSetActiveFilter = filter => {
    let arr = [];
    const current_url = 'dashboard';
    // Set filter depending on 'filter' value
    switch(filter) {
      case "all": 
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "open":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "pending":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "closed":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      default:
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
    }
  }

  const onSetFilter = (e, filter) => {
    e.preventDefault();
    setActive(e);
    // Assigns link's text to filter 
    if(e.target.classList.contains('chip')) {
      // if Target is the 'a' tag slice textContent
      filter = e.target.textContent.slice(0, e.target.textContent.indexOf(' '));
    } else {
      // if Target is the 'span' tag, slice the textContent of the parent 'a' tag
      filter = e.target.parentElement.textContent.slice(0, e.target.parentElement.textContent.indexOf(' '));
    }
    let arr = [];
    const current_url = 'dashboard';
    // Set filter depending on 'filter' value
    switch(filter) {
      case "all":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "open":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "pending":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      case "closed":
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.status === filter && ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }
      default:
        if(user.userType !== 'employee') {
          arr = tickets.filter(ticket => {
            return ticket.assignedTo._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        } else {
          arr = tickets.filter(ticket => {
            return ticket.issuedBy._id === user._id;
          })
          setFilter(filter, arr, current_url, user.userType);
          break;
        }    }
  }

  return (
    <Fragment>
      {filter === 'all' && (
        <a href="#!" className="chip filter" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ user.userType !== 'employee' ? assignedTickets.all : ownedTickets.all })
          </span>
        </a>
      )}

      {filter === 'open' && (
        <a href="#!" className="chip filter green-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ user.userType !== 'employee' ? assignedTickets.open : ownedTickets.open })
          </span>
        </a>
      )}

      {filter === 'pending' && (
        <a href="#!" className="chip filter orange-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ user.userType !== 'employee' ? assignedTickets.pending : ownedTickets.pending })
          </span>
        </a>
      )} 

      {filter === 'closed' && (
        <a href="#!" className="chip filter grey-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ user.userType !== 'employee' ? assignedTickets.closed : ownedTickets.closed })
          </span>
        </a>
      )}
    </Fragment>
  )
}

const styles = {
  label : {
    fontSize: '0.82em'
  }
}

Filter.propTypes = {
  tickets: PropTypes.array,
  user: PropTypes.object,
  ownedTickets: PropTypes.object,
  assignedTickets: PropTypes.object,
  active_filter: PropTypes.string,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  user: state.auth.user,
  active_filter: state.ticket.active_filter_dashboard
});

export default connect(mapStateToProps, { setFilter })(Filter);
