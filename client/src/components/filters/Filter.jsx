import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Filter = ({ filter, tickets, user_id, counter, setFilter }) => {
  const setActive = e => {
    e.preventDefault();
    // Gets UL element children
    let links;
    if(e.target.tagName === 'A') {
      links = e.target.parentElement.parentElement.children;
    } else {
      links = e.target.parentElement.parentElement.parentElement.children;
    }
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
    if(e.target.classList.contains('chip')) {
      // if Target is the 'a' tag slice textContent
      filter = e.target.textContent.slice(0, e.target.textContent.lastIndexOf(' '));
    } else {
      // if Target is the 'span' tag, slice the textContent of the parent 'a' tag
      filter = e.target.parentElement.textContent.slice(0, e.target.parentElement.textContent.lastIndexOf(' '));
    }
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
              {filter}{' '}
              
              {filter.toLowerCase() === 'unassigned' && (
                <span className="grey-text"> 
                  ({ counter && counter.unassigned })
                </span>
              )}

              {filter.toLowerCase() === 'open' && (
                <span className="grey-text"> 
                  ({ counter && counter.open })
                </span>
              )}

              {filter.toLowerCase() === 'pending' && (
                <span className="grey-text"> 
                  ({ counter && counter.pending })
                </span>
              )}

              {filter.toLowerCase() === 'closed' && (
                <span className="grey-text"> 
                  ({ counter && counter.closed })
                </span>
              )}
            </a>
          </li>
        ) : (
          <li>
            <a href="#!" className="chip active" onClick={onSetFilter}>
              {filter} {' '}
              <span className="grey-text"> 
                ({ counter && counter.all })
              </span>
            </a>
          </li>
        )}
        </Fragment>
      ) : (
        <li>
          <a href="#!" className="chip" onClick={onSetFilter}>
            {filter !== 'employee' ? (
              <Fragment>
                Assigned To Me{' '}
                <span className="grey-text"> 
                  ({ counter && counter.assigned })
                </span>
              </Fragment> 
            ) : (
              <Fragment>
                My Tickets{' '}
                <span className="grey-text"> 
                  ({ counter && counter.owned })
                </span>
              </Fragment> 
            )}
          </a>
        </li>   
      )}
  </Fragment>
  )
}

Filter.propTypes = {
  user_id: PropTypes.string.isRequired,
  tickets: PropTypes.array,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user_id: state.auth.user._id
});

export default connect(mapStateToProps, { setFilter })(Filter);
