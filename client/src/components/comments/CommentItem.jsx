import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { updateComment, setCurrent, clearCurrent, setEditMode } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, current_user, current_comment, edit_mode, updateComment, setCurrent, clearCurrent, setEditMode }) => {
  const { message, user, isUpdated, createdAt, updatedAt } = comment;

  const [newMessage, setNewMessage] = useState('');
  const [current, setCurrentComment] = useState(false);

  const onChange = e => setNewMessage({ [e.target.name]: e.target.value });

  const onEdit = e => {
    e.preventDefault();
    setNewMessage(message)
    setCurrent(comment._id);
    setEditMode();
  }

  const onCancel = e => {
    e.preventDefault();
    clearCurrent();
    setEditMode();
    setNewMessage('')
  }

  const onDelete = e => {
    e.preventDefault();

    if(current === false) {
      setCurrent(comment._id);
      setCurrentComment(true);
      let instance = M.Modal.getInstance(document.getElementById("delete-comment-modal"));
      instance.open();
      setCurrentComment(false);
    } 
  }

  const onSave = e => {
    e.preventDefault();
    if(!current) {
      setCurrentComment(true);

      const newCommentInfo = {
        message: newMessage.message,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        }
      }
      updateComment(comment._id, newCommentInfo);
      setCurrentComment(false);
      setEditMode();
    } 
  }

  return (
    <Fragment>
      <div className="collection-item avatar">
        <i className="circle grey lighten-2 z-depth-2">
          <FontAwesomeIcon icon="user" className={comment.user.userType !== "employee" ? "indigo-text text-darken-2" : "cyan-text text-darken-1"} />
        </i>  
        <div>
          {/* User Type */}
          {user.userType === 'employee' ? (
            <span className="comment-user-type cyan darken-1 white-text z-depth-1">Employee</span>
          ) : (
            <span className="comment-user-type indigo darken-2 white-text z-depth-1">Technician</span>
          )}
          
          {/* Comment Recency */}
          <span className="right grey-text text-darken-1">
            <Moment fromNow className="comment-time">
              {!isUpdated ? createdAt : updatedAt}
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
          {!edit_mode && current_comment !== comment._id ? (
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
        </div>
        <div>
          {/* User Action buttons */}
          {user.id === current_user && (
            <div className="right">
              {!edit_mode ? (
                <Fragment>
                  <a href="#!" className="blue-text comment-label" onClick={onEdit}>
                    edit
                  </a>
                  <span className="grey-text"> | </span>
                  <a href="#!" className="red-text comment-label" onClick={onDelete}>
                    delete
                  </a>
                </Fragment>
              ) : (
                <Fragment>
                {current_comment !== comment._id ? (
                  <Fragment>
                    <a href="#!" className="blue-text comment-label" onClick={onEdit}>
                      edit
                    </a>
                    <span className="grey-text"> | </span>
                    <a href="#!" className="red-text comment-label" onClick={onDelete}>
                      delete
                    </a>
                  </Fragment>
                ) : (
                  <Fragment>
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
                  </Fragment>
                )}
                </Fragment>
              )}
            </div>
          )}
        </div>          
      </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  current_user: PropTypes.string.isRequired,
  current_comment: PropTypes.string,
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