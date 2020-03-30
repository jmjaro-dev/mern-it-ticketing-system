import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addTicket } from '../../actions/ticketActions';
import { getTechs } from '../../actions/userActions';
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
    getTechs();
    // eslint-disable-next-line
  }, []);

  const { title, description, priority, assignedTo } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onCancel = async e => {
    e.preventDefault();
    setTicket({
      title: '',
      description: '',
      priority: '',
      assignedTo: ''
    })
  }

  const onSubmit = async e => {
    e.preventDefault();

    if(title !== '' || description !== '' || priority !== '') {
      let assignedTO;
      
      if(assignedTo !== 'Unassigned') {
        assignedTO = techs.find(tech => assignedTo === tech._id);
      } else {
        assignedTO = 'Unassigned'
      }
      
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
  
      await addTicket(newTicket);
  
      setTicket({
        title: '',
        description: '',
        priority: '',
        assignedTo: ''
      });
  
      setAlert('Ticked created!', 'success');

      let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
      instance.close(); 
    }
  }

  return (
    <Fragment>
      <div id="create-ticket-modal" className="modal">
        <div className="modal-content">
          <h5 className="center">
            Create <span className="blue-text text-darken-2">Ticket</span> Form
          </h5>
          <form onSubmit={onSubmit} styles={modalStyles.ticketForm}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" value={title} onChange={onChange} required/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." value={description} onChange={onChange} required></textarea>
            </div>

            <div className="form-group">
              <label>Priority Level</label>
              <select name="priority" className="browser-default" value={priority} onChange={onChange} required>
                <option value="" disabled>- Priority Level -</option>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
            {user && user.userType === 'employee' && (
              <div className="form-group">
                <label>Assign To</label>
                <select name="assignedTo" className="browser-default" value={assignedTo} onChange={onChange} required>
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
          {title !== '' && description !== '' && priority !== '' ? (
            <button onClick={onSubmit} className="waves-effect btn-small blue darken-2">Submit</button>
          ) : (
            <button className="btn-small" disabled>Submit</button>
          )}
        </div>
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

CreateTicketModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  techs: PropTypes.array,
  setAlert: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  techs: state.user.techs
});

export default connect(mapStateToProps, { getTechs, addTicket, setAlert } )(CreateTicketModal);