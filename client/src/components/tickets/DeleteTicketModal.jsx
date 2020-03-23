import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { deleteTicket, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const DeleteTicketModal = ({ current, deleteTicket, setAlert, clearCurrent }) => {
  const onConfirm = async e => {
    e.preventDefault();

    deleteTicket(current._id);
    clearCurrent();
    setAlert('Ticket deleted successfully!', 'success');
    // if(history.location.pathname === `/tickets/${current._id}`) {
    //   history.push('/');
    // }
  }

  return (
    <div id="delete-ticket-modal" className="modal" style={modalStyle.container}>
      <div className="modal-content">
        <p className="center grey-text text-darken-2" style={modalStyle.header}>
          <i className="fas fa-exclamation-triangle yellow-text text-darken-2" /> Warning
        </p>
        <p className="center">Are you sure you want to <span className="red-text text-darken-2">delete</span> the ticket?</p>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-small white black-text">Cancel</button>
        {' '}
        <button onClick={onConfirm} className="modal-close waves-effect btn-small blue darken-2">Yes</button>
      </div>
    </div>
  )
}

DeleteTicketModal.propTypes = {
  current: PropTypes.object,
  deleteTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const modalStyle = {
  container: {
    padding: '0 0.5em 0.5em 0.5em',
    width: '450px',
    borderRadius: '1em'
  },
  header: {
    fontSize: '1.5em'
  }
};

const mapStateToProps = state => ({
  current: state.ticket.current
});

export default connect(mapStateToProps, { deleteTicket, setAlert, clearCurrent })(DeleteTicketModal);