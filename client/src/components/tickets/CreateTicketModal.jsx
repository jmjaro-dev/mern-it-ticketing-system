import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addTicket } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const CreateTicketModal = ({ user, addTicket, setAlert }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: ''
  });

  const { title, description, priority } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onCancel = async e => {
    e.preventDefault();
    setTicket({
      title: '',
      description: '',
      priority: ''
    })
  }

  const onSubmit = async e => {
    e.preventDefault();

    if(title !== '' || description !== '' || priority !== '') {
      const newTicket = {
        title,
        description,
        priority,
        issuedBy : {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }
  
      await addTicket(newTicket);
  
      setTicket({
        title: '',
        description: '',
        priority: ''
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
  setAlert: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { addTicket, setAlert } )(CreateTicketModal);