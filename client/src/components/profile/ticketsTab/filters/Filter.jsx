import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../../../actions/ticketActions';
import PropTypes from 'prop-types';

const Filter = ({ filter, assigned, owned, ownedTickets, assignedTickets, setFilter, activeFilter, setActiveFilter }) => {
  // useEffect(() => {
  //   if(activeFilter !== null) {
      
  //   }
  // }, [activeFilter]);
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
    const current = e.target.innerText;
    // Adding/Removing 'active' class from element
    for(let index=0; index < links.length; index++) {
      if(links[index].innerText !== current) {
        links[index].classList.remove('active');
      } else {
        links[index].classList.add('active');
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
    setActiveFilter(filter);
    let arr = [];
    const current_url = 'profile';
    // Set filter depending on 'filter' value
    switch(filter) {
      case "open":
        if(assigned) {
          arr = assigned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        } else {
          arr = owned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        }
      case "pending":
        if(assigned) {
          arr = assigned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        } else {
          arr = owned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        }
      case "closed":
        if(assigned) {
          arr = assigned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        } else {
          arr = owned.filter(ticket => {
            return ticket.status === filter;
          })
          setFilter(filter, arr, current_url);
          break;
        }
      default:
        if(assigned) {
          setFilter(filter, assigned, current_url);
          break;
        } else {
          setFilter(filter, owned, current_url);
          break;
        }
    }
  }

  return (
    <Fragment>
      {filter === 'all' && (
        <a href="#!" className="chip filter active" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ assigned ? assignedTickets.all : ownedTickets.all })
          </span>
        </a>
      )}

      {filter === 'open' && (
        <a href="#!" className="chip filter green-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ assigned ? assignedTickets.open : ownedTickets.open })
          </span>
        </a>
      )}

      {filter === 'pending' && (
        <a href="#!" className="chip filter orange-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ assigned ? assignedTickets.pending : ownedTickets.pending })
          </span>
        </a>
      )} 

      {filter === 'closed' && (
        <a href="#!" className="chip filter grey-text text-darken-2" style={styles.ticket_label} onClick={onSetFilter}> 
          {filter} {' '}
          <span className="grey-text" style={styles.label}> 
            ({ assigned ? assignedTickets.closed : ownedTickets.closed })
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
  assigned: PropTypes.array,
  owned: PropTypes.array,
  ownedTickets: PropTypes.object,
  assignedTickets: PropTypes.object,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setActiveFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  assigned: state.ticket.assigned,
  owned: state.ticket.owned
});

export default connect(mapStateToProps, { setFilter })(Filter);
