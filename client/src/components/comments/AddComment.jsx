import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentActions';
import PropTypes from 'prop-types';
// import M from 'materialize-css/dist/js/materialize.min.js';

const AddComment = ({ ticket_id, user, addComment }) => {
  const [message, setMessage] = useState('');

  const { _id, firstName, lastName, userType } = user;

  const onChange = e => setMessage({ [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const userInfo =  {
      id: _id,
      firstName,
      lastName,
      userType
    };

    await addComment(ticket_id, message.message, userInfo);
    // M.toast({ 
    //   html: 'Comment added',
    //   classes: 'green white-text'
    // });

    setMessage('');
    document.getElementsByName("comment-message").value = '';
  }

  return (
    <div>
      <ul className="collection card-panel comment-add-container">
        <li className="collection-item avatar">
          <i className="fas fa-user circle blue-text text-darken-2 grey lighten-2 z-depth-2"></i>  
          <div className="form-group">    
            <div className="col s11">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="comment-message" className="materialize-textarea" placeholder="Write a comment..." onChange={onChange} value={message.message}></textarea>
            </div>
            <div className="col s1 comment-submit">
              <br/>
              {message !== '' ? (
                <a href="#!" className="center blue-text text-darken-1" onClick={onSubmit}>
                  <i className="fas fa-paper-plane"></i>
                </a>
              ) : (
                <span className="center grey-text text-darken-1">
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
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(AddComment);