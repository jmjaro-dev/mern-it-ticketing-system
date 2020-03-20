import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteTicket, setCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const TicketItem = ({ ticket, setCurrent, deleteTicket }) => {

  const { _id, priority, status, title, issuedBy, createdAt } = ticket;

  const onSetCurrent = () => {
    setCurrent(ticket);
  }
  
  return (
    <tr>
      <td className="ticket-info center">{_id}</td>
      <td className="ticket-info center">
        {(priority === 'low') && (
          <span className="alert-badge grey"></span>
        )}
        {(priority === 'normal') && (
          <span className="alert-badge green"></span>
        )}
        {(priority === 'high') && (
          <span className="alert-badge red"></span>
        )}  
      </td>
      <td className="ticket-info center">
        <span>{status}</span>
      </td>
      <td>
        <Link to={`/tickets/${_id}`} className="ticket-details blue-text text-darken-2" onClick={onSetCurrent}>
          {title}
        </Link>
      </td>
      <td className="ticket-info">{issuedBy.firstName} {' '} {issuedBy.lastName}</td>
      <td className="ticket-info center">
        {(priority === 'low') && (
          <span className="priority-badge grey-text text-darken-2">{priority}</span>
        )}
        {(priority === 'normal') && (
          <span className="priority-badge green-text text-darken-2">{priority}</span>
        )}
        {(priority === 'high') && (
          <span className="priority-badge red-text text-darken-2">{priority}</span>
        )}
      </td>
      <td className="ticket-info center">
        <Moment format="MM-DD-YYYY, ">
        {createdAt} 
        </Moment>
        <span> @ </span>
        <Moment format="hh:mm A">
        {createdAt} 
        </Moment>
      </td>
      <td className="center">
        <a href="#!">
          <i className="far fa-trash-alt red-text text-darken-2"></i>
        </a>
        {' '}
        <a href="#!">
          <i className="far fa-edit green-text text-darken-2"></i>
        </a>   
      </td>
    </tr>
  )
}

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired
};


export default connect(null, { deleteTicket, setCurrent })(TicketItem);