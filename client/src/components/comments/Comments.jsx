import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

const Comments = ({ comments, current_user, loading }) => {
  if(comments !== null && comments.length === 0 && !loading) {
    return <p>There are no comments yet.</p>
  }

  return (
    <Fragment>
      {comments !== null && !loading && (
        <Fragment>
          {comments.map((comment, index) => (
            <Fragment>
              <CommentItem key={comment._id} index={index} comment={comment} current_user={current_user} />
            </Fragment>
          ))}
        </Fragment>
      )}   
    </Fragment>
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  loading: PropTypes.bool,
  current_user: PropTypes.string
};

const mapStateToProps = state => ({
  comments: state.comment.comments,
  loading: state.comment.loading
});

export default connect(mapStateToProps, null)(Comments);