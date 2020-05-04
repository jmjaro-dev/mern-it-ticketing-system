import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { deleteTicket, clearCurrent, setTicketExists } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const DeleteTicketModal = ({ current, user, ticket_exists, deleteTicket, setAlert, setTicketExists, clearCurrent }) => {
  const onConfirm = async e => {
    e.preventDefault();
    deleteTicket(current.ticket._id, user.userType, current.current_url);
    if(ticket_exists) {
      setTicketExists(false);
    }
    clearCurrent();
    setAlert('Ticket deleted successfully', 'success');
  }

  return (
    <div id="delete-ticket-modal" className="modal" style={styles.modal}>
      <div className="modal-content">
        <h5 className="center grey-text text-darken-2">
        <FontAwesomeIcon icon="exclamation-circle" size="lg" className="yellow-text text-darken-2"/> {' '}
        Are you sure?
        </h5>
        <br/>
        <p className="center">Click <span className="blue darken-2 white-text z-depth-1" style={styles.confirm_text}>YES</span> to <span className="red-text text-darken-2">delete</span> your ticket.</p>
      </div>
      <div className="modal-footer" style={styles.footer}>
        <button className="modal-close btn-small white black-text">Cancel</button>
        {' '}
        <button onClick={onConfirm} className="modal-close waves-effect btn-small blue darken-2">Yes</button>
      </div>
    </div>
  )
}

DeleteTicketModal.propTypes = {
  current: PropTypes.object,
  user: PropTypes.object,
  ticket_exists: PropTypes.bool,
  deleteTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setTicketExists: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const styles = {
  modal: {
    padding: '0 0.5em 0.5em 0.5em',
    width: '450px'
  },
  confirm_text: {
    padding: "0.5em 1em",
    borderRadius: "0.1em",
    fontSize: "0.9em",
  }, 
  footer: {
    padding: '0 1em 1em 0'
  }
};

const mapStateToProps = state => ({
  current: state.ticket.current,
  user: state.auth.user,
  ticket_exists: state.ticket.ticket_exists
});

export default connect(mapStateToProps, { deleteTicket, setAlert, setTicketExists, clearCurrent })(DeleteTicketModal);