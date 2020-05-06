import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddCommentBtn = ({ user, current }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const onCreate = e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("add-comment-modal"));
    instance.open();
  }

  return (
    <Fragment>
      {user && current && (current.ticket.issuedBy._id === user._id || current.ticket.assignedTo._id === user._id) && (
        <div className="fixed-action-btn">
          <a href="#add-comment-modal" className="btn-floating btn-large blue darken-2 tooltipped" data-position="left" data-tooltip="Add Comment" onClick={onCreate}>
          <FontAwesomeIcon icon="comment-dots" size="lg" />
          </a>
        </div>
      )}
    </Fragment>
  )
};

AddCommentBtn.propTypes = {
  user: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  current: state.ticket.current
});

export default connect(mapStateToProps)(AddCommentBtn);
