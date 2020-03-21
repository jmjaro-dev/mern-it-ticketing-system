import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { setCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketItem = ({ ticket, user, setCurrent }) => {

  const { _id, priority, status, title, issuedBy, createdAt } = ticket;

  const onSetCurrent = () => {
    setCurrent(ticket);
  }

  const onUpdate = async e => {
    e.preventDefault();
    setCurrent(ticket);
    let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
    instance.open();
  }
  const onDelete = async e => {
    e.preventDefault();
    onSetCurrent();
    let instance = M.Modal.getInstance(document.getElementById("delete-ticket-modal"));
    instance.open();
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
        <span> at </span>
        <Moment format="hh:mm A">
        {createdAt} 
        </Moment>
      </td>
      <td className="center">
        <Link to={`/tickets/${_id}`}>
          <i className="fas fa-eye blue-text text-darken-2"></i>
        </Link>
        {' '}  
        {issuedBy._id === user._id && (
          <Fragment>
            <a href="#!" onClick={onUpdate}>
              <i className="far fa-edit green-text text-darken-2"></i>
            </a>
            {' '}
            <a href="#!" onClick={onDelete}>
              <i className="far fa-trash-alt red-text text-darken-2"></i>
            </a>
          </Fragment>
        )}
      </td>
    </tr>
  )
}

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { setCurrent })(TicketItem);