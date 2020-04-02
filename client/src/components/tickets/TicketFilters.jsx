import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setFilter, filterTickets, clearFilter } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketFilters = ({ user, tickets, setFilter, loading, filterTickets, clearFilter }) => {
  const [text, setText] = useState('');

  const { userType } = user;

  const setActive = e => {
    e.preventDefault();

    const links = e.target.parentElement.parentElement.children;
    const current = e.target.innerText;
    console.log(links, current, typeof(links), links.length);
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
    setActive(e);
    filter = e.target.innerText;
    console.log(filter, typeof(filter));
    let arr = [];

    switch(filter) {
      case "All Tickets":
        setFilter(tickets);
        break;
      case "My Tickets": 
        arr = tickets.filter(ticket => {
          return user._id === ticket.issuedBy._id;
        })
        setFilter(arr);
        break;
      case "Assigned To Me":
        arr = tickets.filter(ticket => {
          return user._id === ticket.assignedTo._id;
        })
        setFilter(arr);
        break;
      case "Unassigned":
        arr = tickets.filter(ticket => {
          return ticket.assignedTo.to === 'Unassigned';
        })
        setFilter(arr);
        break;
      case "Open":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(arr);
        break;
      case "Pending":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(arr);
        break;
      case "Closed":
      arr = tickets.filter(ticket => {
        return ticket.status === filter.toLowerCase();
      })
      setFilter(arr);
      break;
      default:
        arr = null;
    }
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
    <div className="row white">
    {tickets && !loading && (
      <div>
        <nav id="sub-menu"  className="transparent">
          <div className="col s7 nav-wrapper">
            <ul className="ticket-details nav-wrapper">
              <li>
                <a href="#!" className="chip active" onClick={onSetFilter}>
                  All Tickets {' '}
                </a>
              </li>
              
              <li>
                <a href="#!" className="chip" onClick={onSetFilter}>
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
              </li>
              
              <li>
                <a href="#!" className="chip" onClick={onSetFilter}>
                  Unassigned
                </a>  
              </li>

              <li>
                <a href="#!" className="chip" onClick={onSetFilter}>
                  Open
                </a>
              </li>
              <li>
                <a href="#!" className="chip" onClick={onSetFilter}>
                  Pending
                </a>
              </li>
              
              <li>
                <a href="#!" className="chip" onClick={onSetFilter}>
                  Closed
                </a>
              </li>            
            </ul>
          </div>
          <div className="col s2 valign-wrapper" id="createBtnContainer">
            {userType !== 'employee' ? (
              <Fragment>
                {' '}
              </Fragment>
            ) : (
              <a href="#create-ticket-modal" className="nav-links btn-small right blue darken-1" onClick={onCreate}>
                + New ticket
              </a>
            )}
          </div>

          <div className="col s3 valign-wrapper">
            <div className="col s1">
              <FontAwesomeIcon icon="search" className="blue-text" />  
            </div>
            <div className="col s11">
              <input name="text" type="text" placeholder="Search a Ticket..." onChange={onChange} onKeyUp={onChange} value={text}/>
            </div>
          </div>
        </nav>
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

export default connect(mapStateToProps, { setFilter, filterTickets, clearFilter })(TicketFilters);