import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { setCurrent } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketItem = ({ ticket, user, setCurrent }) => {
  const { _id, priority, status, title, issuedBy, createdAt, assignedTo } = ticket;

  // Set Current Ticket
  const onSetCurrent = () => {
    setCurrent(ticket);
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
    <tr className="hoverable">
      {/* Ticket ID */}
      <td className="ticket-info center">{_id}</td>
      {/* Alert Level */}
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
      {/* Ticket Status */}
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
      {/* Ticket Title */}
      <td>
        <Link to={`/tickets/${_id}`} className="ticket-details blue-text text-darken-2" onClick={onSetCurrent}>
          <span className="truncate">{title}</span>
        </Link>
      </td>
      {/* Issued By */}
      <td className="ticket-info">{issuedBy.firstName} {' '} {issuedBy.lastName}</td>
      {/* Priority Level */}
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
      {/* Date Created */}
      <td className="ticket-info center">
        <Moment format="MM-DD-YYYY, ">
        {createdAt} 
        </Moment>
        <span> at </span>
        <Moment format="hh:mm A">
        {createdAt} 
        </Moment>
      </td>
      {/* Assigned To */}
      <td className="ticket-info">
        {assignedTo.to !== 'Unassigned' ? (
          <Fragment>
            {assignedTo.firstName} {' '} {assignedTo.lastName}
          </Fragment>
        ) : (
          <Fragment>
            {assignedTo.to}
          </Fragment>
        )}
        
      </td>
      {/* Actions */}
      <td className="center">
        <Link to={`/tickets/${_id}`}>
          <FontAwesomeIcon icon="eye" className="blue-text text-darken-2" />
        </Link>
        {' '}
        {/* Update Link for Ticket Owner and Assigned Technician */}
        {(issuedBy._id === user._id || (user.userType === 'technician' && ticket.assignedTo._id === user._id)) && (
          <a href="#!" onClick={onUpdate}>
            <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
          </a>
        )}
        {/* Update Link for Technicians on unassigned tickets */}
        {user.userType === 'technician' && ticket.assignedTo.to === 'Unassigned' && (
          <a href="#!" onClick={onUpdate}>
            <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
          </a>
        )}
        {issuedBy._id === user._id && (
          <Fragment>
            {' '}
            <a href="#!" onClick={onDelete}>
              <FontAwesomeIcon icon={[ "far", "trash-alt" ]} className="red-text text-darken-2" />
            </a>
          </Fragment>
        )}
      </td>
    </tr>
  )
}

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { setCurrent })(TicketItem);