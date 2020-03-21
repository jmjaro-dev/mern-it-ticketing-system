import React from 'react';
import { connect } from 'react-redux';
import { deleteComment, clearCurrent } from '../../actions/commentActions';
import PropTypes from 'prop-types';


const DeleteCommentModal = ({ current, deleteComment, clearCurrent }) => {
  const onConfirm = () => {
    deleteComment(current);
    clearCurrent();
  }

  return (
    <div id="delete-comment-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h5 className="center grey-text text-darken-2">
          <i className="fas fa-exclamation-circle red-text text-darken-2" /> Please Confirm
        </h5>
        <br/>
        <p>Are you sure you want to <span className="red-text text-darken-2">delete</span> your comment?</p>
      </div>

      <div className="modal-footer">
        <a href="#!" className="modal-close btn-flat">Cancel</a>
        {' '}
        <a href="#!" onClick={onConfirm} className="modal-close waves-effect btn blue darken-2">Confirm</a>
      </div>
    </div>
  )
}

DeleteCommentModal.propTypes = {
  comment_id: PropTypes.string,
  deleteComment: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const modalStyle = {
  width: '500px'
};

const mapStateToProps = state => ({
  current: state.comment.current_comment
});

export default connect(mapStateToProps, { deleteComment, clearCurrent })(DeleteCommentModal);