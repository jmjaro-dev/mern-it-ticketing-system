import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

const Comments = ({ comments, current_user }) => {
  if(comments !== null && comments.length === 0) {
    return <p>There are no comments yet.</p>
  }

  return (
    <Fragment>
      {comments !== null && (
        <Fragment>
          {comments.map((comment, index) => (
            <CommentItem key={comment._id} index={index} comment={comment} current_user={current_user} />
          ))}
        </Fragment>
      )}   
    </Fragment>
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  current_user: PropTypes.string
};

const mapStateToProps = state => ({
  comments: state.comment.comments
});

export default connect(mapStateToProps, null)(Comments);