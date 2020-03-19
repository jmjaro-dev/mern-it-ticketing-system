import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

const Comments = ({ comments, current_user, loading }) => {

  if(comments !== null && comments.length === 0 && !loading) {
    return <h4>There are no comments yet.</h4>
  }

  return (
    <Fragment>
      {comments !== null && !loading && (
        <Fragment>
          {comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} current_user={current_user} />
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