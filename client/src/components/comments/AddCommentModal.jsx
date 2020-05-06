import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const AddCommentModal = ({ current, user, addComment }) => {
  const [message, setMessage] = useState('');
  
  const onChange = e => setMessage(e.target.value);

  const onCancel = e => {
    e.preventDefault();
    setMessage('');
    document.getElementsByName("comment-message").value = '';
  }
  
  const onSubmit = e => {
    e.preventDefault();

    const userInfo =  {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType
    };

    addComment(current.ticket._id, message, userInfo);

    setMessage('');
    document.getElementsByName("comment-message").value = '';
  }

  return (
    <Fragment>
      {user && current && (
        <div id="add-comment-modal" className="modal" style={styles.modal}>
          <div className="modal-content collection comment-add-container" style={styles.modal_content}>
            <p className="center grey-text text-darken-2" style={styles.header}>
              <FontAwesomeIcon icon="comment-dots" size="lg" className="blue-text text-darken-2" />
              {' '} Add Comment
            </p>
            <div className="collection-item avatar">
              <i className="circle grey lighten-2 z-depth-2">
                <FontAwesomeIcon icon="user" className={user.userType !== "employee" ? "indigo-text text-darken-2" : "cyan-text text-darken-1"}/>
              </i>
              <div className="form-group">    
                <div className="col s11">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="comment-message" className="materialize-textarea" placeholder="Write a comment..." onChange={onChange} value={message}></textarea>
                </div>
              </div>          
            </div>
          </div>
          <div className="modal-footer" style={styles.footer}>
            <a href="#!" className="modal-close btn-small btn-flat" onClick={onCancel}>Cancel</a>
            {' '}
            {message !== '' ? (
              <a href="#!" className="modal-close btn-small blue darken-2" onClick={onSubmit} >
                submit {' '}
                <FontAwesomeIcon icon="paper-plane" />
              </a>
            ) : (
              <span className="modal-close btn-small btn-flat text-darken-1" disabled>
                submit {' '}
                <FontAwesomeIcon icon="paper-plane" />
              </span>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

const styles = {
  modal: {
    padding: '0'
  },
  modal_content: {
    padding: '0 !important'
  },
  header: {
    fontSize: "1.5em"
  },
  footer: {
    paddingRight: "1em"
  }
};

AddCommentModal.propTypes = {
  current: PropTypes.object,
  user: PropTypes.object,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.ticket.current,
  user: state.auth.user
});

export default connect(mapStateToProps, { addComment })(AddCommentModal);