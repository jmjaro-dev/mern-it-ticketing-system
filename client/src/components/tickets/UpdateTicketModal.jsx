import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { updateTicket, clearCurrent } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateTicketModal = ({ current, ticket_exists, user, techs, updateTicket, setAlert, clearCurrent }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    assignedTo: ''
  });

  useEffect(() => {
    if(current !== null) {
      setTicket({
        title: current.ticket.title,
        description: current.ticket.description,
        priority: current.ticket.priority,
        status: current.ticket.status,
        assignedTo: current.ticket.assignedTo
      })
    }
  }, [current]);
  
  const { title, description, priority, status, assignedTo } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const closeModal = () => {
    let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
    instance.close();
  }

  const onCancel = e => {
    e.preventDefault();
    setTicket({
      title: '',
      description: '',
      priority: '',
      status: '',
      assignedTo: ''
    });
    if(!ticket_exists) {
      clearCurrent();
    }
    closeModal();
  }

  const onSubmit = () => {
    if(title !== '' || description !== '' || priority !== '' || status !== '' || assignedTo !== '') {
      let assignedTO;
      
      if(assignedTo !== 'Unassigned') {
        assignedTO = techs.find(tech => assignedTo === tech._id);
      } else {
        assignedTO = { to: 'Unassigned' }
      }
      
      const current_url = current.current_url;

      const updatedTicket = {
        _id: current.ticket._id,
        title,
        description,
        priority,
        status,
        assignedTo: assignedTO
      }
      
      updateTicket(updatedTicket, user._id, user.userType, current_url);

      setTicket({
        title: '',
        description: '',
        priority: '',
        status: '',
        assignedTo: ''
      });

      closeModal();   
      if(current_url !== 'ticket') {
        clearCurrent();
      }
      setAlert('Ticket updated successfully!', 'success');
    }
  }

  return (
    <Fragment>
      <div id="update-ticket-modal" className="modal modal-fixed-footer" style={styles.modal}>
        {user && current !== null &&  (
          <Fragment>
            <div className="modal-content">
              {/* Header */}
              <div className="row">
                <div className="col s12">
                  <p className="center" style={styles.ticket_header}>
                    <FontAwesomeIcon icon="edit" size="lg" className="blue-text text-darken-2"/> {' '}
                    Update Ticket
                  </p>    
                </div>  
              </div>
              {/* Form STARTS */}
              <form onSubmit={onSubmit} styles={styles.modal}>
                {/* Title */}
                <div className="row">
                  <div className="form-group col s12">
                    <label htmlFor="title">Title</label>
                    {user._id !== current.ticket.issuedBy._id ? (
                      <input type="text" name="title" defaultValue={current.ticket.title} onChange={onChange} disabled/>
                    ): (
                      <input type="text" name="title" defaultValue={current.ticket.title} onChange={onChange} required/>
                    )}
                    
                  </div>
                </div>
                {/* Description */}
                <div className="row">
                  <div className="form-group col s12">
                    <label htmlFor="description">Description</label>
                    {user._id !== current.ticket.issuedBy._id ? (
                      <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.ticket.description} onChange={onChange} disabled></textarea>
                    ) : (
                      <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.ticket.description} onChange={onChange} required></textarea>
                    )}
                  </div>
                </div>
                {/* Priority Level & Status */}
                <div className="row">
                  {/* Priority Level */}
                  <div className="form-group col s12 m6">
                    <label>Priority Level</label>
                    {user._id !== current.ticket.issuedBy._id ? (
                      <select name="priority" className="browser-default" defaultValue={current.ticket.priority}  onChange={onChange} disabled>
                        <option value="" disabled>- Priority Level -</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <select name="priority" className="browser-default" defaultValue={current.ticket.priority}  onChange={onChange} required>
                        <option value="" disabled>- Priority Level -</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    )}
                  </div>
                  {/* Status */}
                  <div className="form-group col s12 m6">
                    <label>Status</label>
                    {user._id !== current.ticket.issuedBy._id && user.userType === 'technician' && assignedTo._id !== user._id ? (
                      <select name="status" className="browser-default" defaultValue={current.ticket.status}  onChange={onChange} disabled>
                        <option value="" disabled>- Status -</option>
                        <option value="open">open</option>
                        <option value="pending">pending</option>
                        <option value="closed">closed</option>
                      </select>
                    ) : (
                      <select name="status" className="browser-default" defaultValue={current.ticket.status}  onChange={onChange} required>
                        <option value="" disabled>- Status -</option>
                        <option value="open">open</option>
                        <option value="pending">pending</option>
                        <option value="closed">closed</option>
                      </select>
                    )}
                  </div>
                </div>
                {/* Assigned */}
                <div className="row">
                  {/* If user = employee and owns the ticket : show Assign field*/}
                  {user && user.userType === 'employee' && user._id === current.ticket.issuedBy._id && (
                    <div className="form-group col s12">
                      <label>Assigned To</label>
                      <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                        <option value="" disabled>- Assign Ticket To -</option>
                        <option value="Unassigned">- Unassigned -</option>
                        {techs && techs.map(tech => (
                          <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* If Ticket = Unassigned & user = technician : show Assign field*/}
                  {user && user.userType === 'technician' && (current.ticket.assignedTo.to === 'Unassigned' || current.ticket.assignedTo._id === user._id) && (
                    <div className="form-group col s12">
                      <label>Assign To</label>
                      <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                        <option value="" disabled>- Assign Ticket To -</option>
                        <option value="Unassigned">- Unassigned -</option>
                        <option value={user._id}>{user.firstName} {user.lastName}</option>
                      </select>
                    </div>
                  )}
                </div>
                {/* Form ENDS */}
              </form>
            </div>

            <div className="modal-footer" style={styles.footer}>
              <button onClick={onCancel} className="btn-small white black-text">Cancel</button>
              {' '}
              {current !== null && title !== '' && description !== '' && priority !== '' && priority !== '' && assignedTo !== '' ? (
                <Fragment>
                  {current !== null && (title !== current.ticket.title || description !== current.ticket.description || priority !== current.ticket.priority || status !== current.ticket.status || assignedTo !== current.ticket.assignedTo) ? (
                    <button onClick={onSubmit} className="waves-effect btn-small blue darken-2">Update</button>
                  ) : (
                    <button className="btn-small" disabled>Update</button>
                  )}
                  
                </Fragment>
              ) : (
                <button className="btn-small" disabled>Update</button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

const styles = {
  modal : {
    padding: '0 0.5em 0 0.5em'
  },
  ticket_header: {
    fontSize: "1.5em",
    fontWeight: "bold"
  }, 
  footer: {
    paddingRight: '1em'
  }
}

UpdateTicketModal.propTypes = {
  current: PropTypes.object,
  ticket_exists: PropTypes.bool,
  user: PropTypes.object,
  techs: PropTypes.array,
  updateTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.ticket.current,
  ticket_exists: state.ticket.ticket_exists,
  user: state.auth.user,
  techs: state.user.techs
});

export default connect(mapStateToProps, { updateTicket, setAlert, clearCurrent })(UpdateTicketModal);