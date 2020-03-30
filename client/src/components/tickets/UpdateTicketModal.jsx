import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { updateTicket, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateTicketModal = ({ current, user, techs, updateTicket, setAlert, clearCurrent }) => {
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
        title: current.title,
        description: current.description,
        priority: current.priority,
        status: current.status,
        assignedTo: current.assignedTo
      })
    }
  }, [current]);
  
  const { title, description, priority, status, assignedTo } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onCancel = async e => {
    e.preventDefault();
  }

  const onSubmit = async e => {
    e.preventDefault();

    if(title !== '' || description !== '' || priority !== '' || status !== '' || assignedTo !== '') {
      let assignedTO;
      
      if(assignedTo !== 'Unassigned') {
        assignedTO = techs.find(tech => assignedTo === tech._id);
      } else {
        assignedTO = 'Unassigned'
      }
      
      const updatedTicket = {
        _id: current._id,
        title,
        description,
        priority,
        status,
        assignedTo: assignedTO,
        userId: user._id
      }
  
      await updateTicket(updatedTicket);
  
      clearCurrent();
      
      setTicket({
        title: '',
        description: '',
        priority: '',
        status: '',
        assignedTo: ''
      })

      let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
      instance.close();
      
      setAlert('Ticket updated successfully!', 'success');
    }
  }

  return (
    <Fragment>
      <div id="update-ticket-modal" className="modal">
        {user && current !== null &&  (
          <Fragment>
            <div className="modal-content">
              <h5 className="center">
                Update <span className="blue-text text-darken-2">Ticket</span> Form
              </h5>
              
              <form onSubmit={onSubmit} styles={modalStyles.ticketForm}>
                {/* Title */}
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  {user._id !== current.issuedBy._id ? (
                    <input type="text" name="title" defaultValue={current.title} onChange={onChange} disabled/>
                  ): (
                    <input type="text" name="title" defaultValue={current.title} onChange={onChange} required/>
                  )}
                  
                </div>
                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  {user._id !== current.issuedBy._id ? (
                    <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} disabled></textarea>
                  ) : (
                    <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} required></textarea>
                  )}
                </div>
                {/* Priority Level */}
                <div className="form-group">
                  <label>Priority Level</label>
                  {user._id !== current.issuedBy._id ? (
                    <select name="priority" className="browser-default" defaultValue={current.priority}  onChange={onChange} disabled>
                      <option value="" disabled>- Priority Level -</option>
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  ) : (
                    <select name="priority" className="browser-default" defaultValue={current.priority}  onChange={onChange} required>
                      <option value="" disabled>- Priority Level -</option>
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  )}
                </div>
                {/* Status */}
                <div className="form-group">
                  <label>Status</label>
                  {user._id !== current.issuedBy._id && user.userType !== 'technician' ? (
                    <select name="status" className="browser-default" defaultValue={current.status}  onChange={onChange} disabled>
                      <option value="" disabled>- Status -</option>
                      <option value="open">open</option>
                      <option value="pending">pending</option>
                      <option value="closed">closed</option>
                    </select>
                  ) : (
                    <select name="status" className="browser-default" defaultValue={current.status}  onChange={onChange} required>
                      <option value="" disabled>- Status -</option>
                      <option value="open">open</option>
                      <option value="pending">pending</option>
                      <option value="closed">closed</option>
                    </select>
                  )}
                </div>
                {/* Assigned */}
                {/* If user is an employee and owns the ticket show Assign field*/}
                {user && user.userType === 'employee' && user._id === current.issuedBy._id && (
                  <div className="form-group">
                    <label>Assign To</label>
                    <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                      <option value="" disabled>- Assign Ticket To -</option>
                      <option value="Unassigned">- Unassigned -</option>
                      {techs && techs.map(tech => (
                        <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* If Ticket is Unassigned show Assign field*/}
                {user && user.userType === 'technician' && ticket.assignedTo.to === 'Unassigned' && (
                  <div className="form-group">
                    <label>Assign To</label>
                    <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                      <option value="" disabled>- Assign Ticket To -</option>
                      <option value="Unassigned">- Unassigned -</option>
                      {techs && techs.map(tech => (
                        <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
            </div>

            <div className="modal-footer">
              <button onClick={onCancel} className="modal-close btn-small white black-text">Cancel</button>
              {' '}
              {current !== null && title !== '' && description !== '' && priority !== '' && priority !== '' && assignedTo !== '' ? (
                <Fragment>
                  {current !== null && (title !== current.title || description !== current.description || priority !== current.priority || status !== current.status || assignedTo !== current.assignedTo) ? (
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

const modalStyles = {
  ticketForm : {
    width: "400px",
    margin: "30px auto"
  },
  ticketBtn: {
    display: "block",
    margin: "0 auto"
  }
};

UpdateTicketModal.propTypes = {
  current: PropTypes.object,
  user: PropTypes.object,
  techs: PropTypes.array,
  updateTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.ticket.current,
  user: state.auth.user,
  techs: state.user.techs
});

export default connect(mapStateToProps, { updateTicket, setAlert, clearCurrent } )(UpdateTicketModal);