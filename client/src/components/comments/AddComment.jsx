import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const AddComment = ({ ticket_id, user, addComment }) => {
  const [message, setMessage] = useState('');

  const { _id, firstName, lastName, userType } = user;

  const onChange = e => setMessage(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const userInfo =  {
      id: _id,
      firstName,
      lastName,
      userType
    };

    addComment(ticket_id, message, userInfo);

    setMessage('');
    document.getElementsByName("comment-message").value = '';
  }

  return (
    <div>
      <div className="collection card-panel comment-add-container">
        <div className="collection-item avatar">
          <i className="circle grey lighten-2 z-depth-2">
            <FontAwesomeIcon icon="user" className={user.userType !== "employee" ? "indigo-text text-darken-2" : "cyan-text text-darken-1"}/>
          </i>
          <div className="form-group">    
            <div className="col s11">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="comment-message" className="materialize-textarea" placeholder="Write a comment..." onChange={onChange} value={message}></textarea>
            </div>
            <div className="col s1 comment-submit">
              <br/>
              {message !== '' ? (
                <a href="#!" className="center blue-text text-darken-1" onClick={onSubmit}>
                  <FontAwesomeIcon icon="paper-plane" />
                </a>
              ) : (
                <span className="center grey-text text-darken-1">
                  <FontAwesomeIcon icon="paper-plane" />
                </span>
              )}
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

AddComment.propTypes = {
  ticket_id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(AddComment);