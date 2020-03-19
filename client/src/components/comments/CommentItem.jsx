import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { updateComment, setCurrent, clearCurrent, setEditMode } from '../../actions/commentActions';
import Moment from 'react-moment';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, current_user, current_comment, edit_mode, updateComment, setCurrent, clearCurrent, setEditMode }) => {

  const { message, user, createdAt, updatedAt } = comment;

  const [newMessage, setNewMessage] = useState('');
  const [current, setCurrentComment] = useState(false);

  const onChange = e => setNewMessage({ [e.target.name]: e.target.value });

  const onEdit = e => {
    e.preventDefault();
    setNewMessage(message)
    setCurrent(comment._id);
    setEditMode();
  }

  const onCancel = async e => {
    e.preventDefault();
    clearCurrent();
    setEditMode();
    setNewMessage('')
  }

  const onDelete = async e => {
    e.preventDefault();

    if(current === false) {
      await setCurrent(comment._id);
      setCurrentComment(true);
      let instance = M.Modal.getInstance(document.getElementById("delete-comment-modal"));
      instance.open();
      setCurrentComment(false);
    } 
  }

  const onSave = async e => {
    e.preventDefault();
    if(!current) {
      await setCurrentComment(true);

      const newCommentInfo = {
        message: newMessage.message,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        }
      }
      await updateComment(comment._id, newCommentInfo);
      setCurrentComment(false);
      setEditMode();
    } 
  }

  return (
    <Fragment>
        
        <div className={user.id === current_user ? "collection-item collection-item-with-actions avatar" : "collection-item avatar" }>
          <i className="fas fa-user circle blue-text text-darken-2 grey lighten-2 z-depth-2"></i>  
          <div>
            {/* User Type */}
            {user.userType === 'employee' ? (
              <span className="comment-user-type cyan darken-1 white-text z-depth-1">Employee</span>
            ) : (
              <span className="comment-user-type indigo darken-2 white-text z-depth-1">Tech</span>
            )}
            
            {/* Comment Recency */}
            <span className="right grey-text text-darken-1">
              <Moment fromNow className="comment-time">
                {createdAt !== updatedAt ? updatedAt : createdAt}
              </Moment>
            </span>
          </div>
          <div>
            {/* Check if user owns the comment */}
            {user.id === current_user ? (
              <span className="comment-user blue-text text-darken-1">{user.firstName} {user.lastName}</span>
            ) : (
              <span className="comment-user">{user.firstName} {user.lastName}</span>
            )}
            
            {/* Edit Mode */}
            {edit_mode === false && current_comment !== comment._id ? (
              <p className="comment-message">
                {message}
              </p>
            ) : (
              <Fragment>
                {current_comment === comment._id && edit_mode ? (
                  <div>
                    <textarea name="message" className="materialize-textarea" onChange={onChange} defaultValue={newMessage}></textarea>
                  </div>
                ) : (
                  <p className="comment-message">
                    {message}
                  </p>
                )}
              </Fragment>
            )}
            
            {/* User Action buttons */}
            {user.id === current_user && (
              <Fragment>
                {edit_mode === false ? (
                  <div className="right">
                    <a href="#!" className="blue-text comment-label" onClick={onEdit}>
                      edit
                    </a>
                    <span className="grey-text"> | </span>
                    <a href="#!" className="red-text comment-label" onClick={onDelete}>
                      delete
                    </a>
                  </div>
                ) : (
                  <div className="right">
                    <a href="#!" className="grey-text text-darken-2 comment-label" onClick={onCancel}>
                      cancel
                    </a>
                    <span className="grey-text"> | </span>
                    {message !== newMessage ? (
                      <a href="#!" className="blue-text comment-label" onClick={onSave}>
                        save
                      </a>
                    ) : (
                      <span href="#1" className="grey-text text-lighten-1 comment-label">
                        save
                      </span>
                    )}
                    
                  </div>
                )}
              </Fragment>
            )}
          </div>          
        </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  current_user: PropTypes.string.isRequired,
  edit_mode: PropTypes.bool,
  updateComment: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current_comment: state.comment.current_comment,
  edit_mode: state.comment.edit_mode
});

export default connect(mapStateToProps, { updateComment, setCurrent, clearCurrent, setEditMode })(CommentItem);