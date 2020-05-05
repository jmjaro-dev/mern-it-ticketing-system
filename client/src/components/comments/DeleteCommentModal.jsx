import React from 'react';
import { connect } from 'react-redux';
import { deleteComment, clearCurrent } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const DeleteCommentModal = ({ current, deleteComment, clearCurrent }) => {
  const onConfirm = () => {
    deleteComment(current);
    clearCurrent();
  }

  return (
    <div id="delete-comment-modal" className="modal" style={styles.modal}>
      <div className="modal-content">
        <h5 className="center grey-text text-darken-2">
          <FontAwesomeIcon icon="exclamation-circle" size="lg" className="yellow-text text-darken-2" />
          {' '} Are you sure?
        </h5>
        <br/>
        <p className="center">Click <span className="blue darken-2 white-text z-depth-1" style={styles.confirm_text}>CONFIRM</span> to <span className="red-text text-darken-2">delete</span> your comment.</p>
      </div>

      <div className="modal-footer" style={styles.footer}>
        <a href="#!" className="modal-close btn-small btn-flat">Cancel</a>
        {' '}
        <a href="#!" onClick={onConfirm} className="modal-close waves-effect btn-small blue darken-2">Confirm</a>
      </div>
    </div>
  )
}

DeleteCommentModal.propTypes = {
  current: PropTypes.string,
  deleteComment: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const styles = {
  modal: {
    padding: '0 0.5em 0.5em 0.5em'
  },
  confirm_text: {
    padding: "0.5em 1em",
    borderRadius: "0.1em",
    fontSize: "0.9em",
  },
  footer: {
    paddingRight: "1em"
  }
};

const mapStateToProps = state => ({
  current: state.comment.current_comment
});

export default connect(mapStateToProps, { deleteComment, clearCurrent })(DeleteCommentModal);