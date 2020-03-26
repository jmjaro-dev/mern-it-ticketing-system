import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { updateTicket, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateTicketModal = ({ current, user, updateTicket, setAlert, clearCurrent }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: '',
    status: ''
  });

  useEffect(() => {
    if(current !== null) {
      setTicket({
        title: current.title,
        description: current.description,
        priority: current.priority,
        status: current.status
      })
    }
  }, [current]);
  
  const { title, description, priority, status } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onCancel = async e => {
    e.preventDefault();
    clearCurrent();
  }

  const onSubmit = async e => {
    e.preventDefault();

    if(title !== '' || description !== '' || priority !== '' || status !== '') {
      const updatedTicket = {
        _id: current._id,
        title,
        description,
        priority,
        status,
        userId: user._id
      }
  
      await updateTicket(updatedTicket);
  
      clearCurrent();
      
      setTicket({
        title: '',
        description: '',
        priority: '',
        status: ''
      })

      let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
      instance.close();
      
      setAlert('Ticket updated successfully!', 'success');
    }
  }

  return (
    <Fragment>
      <div id="update-ticket-modal" className="modal">
        {current !== null && (
          <Fragment>
            <div className="modal-content">
              <h5 className="center">
                Update <span className="blue-text text-darken-2">Ticket</span> Form
              </h5>
              <form onSubmit={onSubmit} styles={modalStyles.ticketForm}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  {user._id !== current.issuedBy._id ? (
                    <input type="text" name="title" defaultValue={current.title} onChange={onChange} disabled/>
                  ): (
                    <input type="text" name="title" defaultValue={current.title} onChange={onChange} required/>
                  )}
                  
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  {user._id !== current.issuedBy._id ? (
                    <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} disabled></textarea>
                  ) : (
                    <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} required></textarea>
                  )}
                </div>

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

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" className="browser-default" defaultValue={current.status}  onChange={onChange} required>
                    <option value="" disabled>- Status -</option>
                    <option value="open">open</option>
                    <option value="pending">pending</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button onClick={onCancel} className="modal-close btn-small white black-text">Cancel</button>
              {' '}
              {current !== null && title !== '' && description !== '' && priority !== '' && priority !== '' ? (
                <Fragment>
                  {current !== null && (title !== current.title || description !== current.description || priority !== current.priority || status !== current.status) ? (
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
  updateTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.ticket.current,
  user: state.auth.user
});

export default connect(mapStateToProps, { updateTicket, setAlert, clearCurrent } )(UpdateTicketModal);