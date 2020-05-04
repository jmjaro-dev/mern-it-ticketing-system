import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addTicket } from '../../actions/ticketActions';
import { getTechs } from '../../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const CreateTicketModal = ({ user, techs, getTechs, addTicket, setAlert }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: '',
    assignedTo: ''
  });

  useEffect(() => {
    if(user && !techs){
      getTechs();
    }
    // eslint-disable-next-line
  }, [user]);

  const { title, description, priority, assignedTo } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onCancel = e => {
    e.preventDefault();
    setTicket({
      title: '',
      description: '',
      priority: '',
      assignedTo: ''
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    if(title !== '' || description !== '' || priority !== '') {
      let assignedTO;
      
      if(assignedTo !== 'Unassigned') {
        assignedTO = techs.find(tech => assignedTo === tech._id);
      } else {
        assignedTO = { to: 'Unassigned' }
      }
      // Create new ticket object
      const newTicket = {
        title,
        description,
        priority,
        issuedBy : {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        },
        assignedTo: assignedTO
      }

      addTicket(newTicket, user.userType);

      setTicket({
        title: '',
        description: '',
        priority: '',
        assignedTo: ''
      });
      setAlert('Ticked created successfully', 'success');
      // Close Modal
      let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
      instance.close(); 
    }
  }

  return (
    <Fragment>
      <div id="create-ticket-modal" className="modal modal-fixed-footer" style={styles.modal}>
        <div className="modal-content">
          <p className="center" style={styles.ticket_header}>
            <FontAwesomeIcon icon="file-invoice" size="lg" className="blue-text text-darken-2"/> {' '}
            Create Ticket
          </p>
          {/* Form Starts */}
          <form onSubmit={onSubmit}>
            {/* Title */}
            <div className="row">
              <div className="form-group col s12">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={onChange} required/>
              </div>
            </div>
            {/* Description */}
            <div className="row">
              <div className="form-group col s12">
                <label htmlFor="description">Description</label>
                <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." value={description} onChange={onChange} required></textarea>
              </div>
            </div>
            {/* Priority Level & Assign Ticket To*/}
            <div className="row">
              {/* Priority Level */}
              <div className="form-group col s12 m6">
                <label>Priority Level</label>
                <select name="priority" className="browser-default" value={priority} onChange={onChange} required>
                  <option value="" disabled>- Priority Level -</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              {/* Assign Ticket To  */}
              {user && user.userType === 'employee' && (
                <div className="form-group col s12 m6">
                  <label>Assign Ticket To</label>
                  <select name="assignedTo" className="browser-default" value={assignedTo} onChange={onChange} required>
                    <option value="" disabled>- Assign Ticket To -</option>
                    <option value="Unassigned">- Unassigned -</option>
                    {techs && techs.map(tech => (
                      <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </form>
          {/* Form Ends */}
        </div>
        {/* Modal Footer - Buttons */}
        <div className="modal-footer" style={styles.footer}> 
          {/* Cancel Btn */}
          <button onClick={onCancel} className="modal-close btn-small white black-text">Cancel</button>
          {' '}
          {/* Create Button */}
          {title !== '' && description !== '' && priority !== '' ? (
            <button onClick={onSubmit} className="waves-effect btn-small blue darken-2">Create</button>
          ) : (
            <button className="btn-small" disabled>Create</button>
          )}
        </div>
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

CreateTicketModal.propTypes = {
  user: PropTypes.object,
  techs: PropTypes.array,
  addTicket: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  techs: state.user.techs
});

export default connect(mapStateToProps, { getTechs, addTicket, setAlert })(CreateTicketModal);