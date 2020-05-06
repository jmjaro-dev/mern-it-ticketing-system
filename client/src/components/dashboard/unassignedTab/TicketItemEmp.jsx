import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { setCurrent } from '../../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketItemEmp = ({ ticket, setCurrent }) => {
  const { _id, priority, status, title, createdAt } = ticket;

  // Set Current Ticket
  const onSetCurrent = () => {
    setCurrent(ticket, 'dashboard');
  }
  // Opens Modal
  const openModal = name => {
    let instance = M.Modal.getInstance(document.getElementById(name));
    instance.open();
  }
  // Trigger UpdateTicketModal
  const onUpdate = async e => {
    e.preventDefault();
    onSetCurrent();
    openModal("update-ticket-modal");
  }
  // Trigger DeleteTicketModal
  const onDelete = async e => {
    e.preventDefault();
    onSetCurrent();
    openModal("delete-ticket-modal");
  }
    
  return (
    <tr key={_id} className="hoverable">
      <td className="ticket-info center">
        {_id}
      </td>
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
        {(status === 'open') && (
          <span className="chip grey lighten-3 green-text text-darken-2">{status}</span>
        )}
        {(status === 'pending') && (
          <span className="chip grey lighten-3 orange-text text-darken-3">{status}</span>
        )}
        {(status === 'closed') && (
          <span className="chip grey lighten-3 text-darken-2">{status}</span>
        )}
      </td>
      <td>
        <Link to={`/tickets/${_id}`} className="ticket-details blue-text text-darken-2" onClick={onSetCurrent}>
          <span className="truncate">{title}</span>
        </Link>  
      </td>
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
        <span> at </span>
        <Moment format="hh:mm A">
        {createdAt} 
        </Moment>
      </td>
      <td className="center">
        <Link to={`/tickets/${_id}`} onClick={onSetCurrent}>
          <FontAwesomeIcon icon="eye" className="blue-text text-darken-2" />
        </Link>
        {' '}
        <a href="#!" onClick={onUpdate}>
          <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
        </a>
        {' '}
        <a href="#!" onClick={onDelete}>
          <FontAwesomeIcon icon={[ "far", "trash-alt" ]} className="red-text text-darken-2" />
        </a>
      </td>
    </tr>
  )
}

TicketItemEmp.propTypes = {
  ticket: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { setCurrent })(TicketItemEmp);