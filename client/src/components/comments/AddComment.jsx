import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addComment } from '../../actions/commentActions';
import { getTicket } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const AddComment = ({ ticket_id, user, addComment, getTicket, setAlert }) => {
  const [message, setMessage] = useState('');

  const { _id, firstName, lastName, userType } = user;

  const onChange = e => setMessage({ ...message, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    const userInfo =  {
      id: _id,
      firstName,
      lastName,
      userType
    };

    addComment(ticket_id, message.message, userInfo);
    setAlert('Comment Added', 'success');
  }

  return (
    <div>
      <ul className="collection card-panel comment-add-container">
        <li className="collection-item avatar">
          <i className="fas fa-user circle blue-text text-darken-2 grey lighten-2"></i>  
          <div className="form-group">    
            <label htmlFor="message">Message</label>
            <div className="col s11">
              <textarea name="message" className="materialize-textarea" placeholder="Write a comment..." onChange={onChange}></textarea>
            </div>
            <div className="col s1">
              {message.message !== '' ? (
                <a href="#!" className="center comment-submit blue-text text-darken-1" onClick={onSubmit}>
                  <i className="fas fa-paper-plane"></i>
                </a>
              ) : (
                <span className="center comment-submit grey-text text-darken-1">
                  <i className="fas fa-paper-plane"></i>
                </span>
              )}
                
            </div>
          </div>          
        </li>
      </ul>
    </div>
  )
}

AddComment.propTypes = {
  ticket_id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  getTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { addComment, getTicket, setAlert })(AddComment);