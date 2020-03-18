import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import { deleteTicket, setCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, current_user }) => {

  const { message, user, createdAt, updatedAt } = comment;

  return (
    <div>
      <ul className="collection card-panel comment-container">
        <li className="collection-item avatar">
          <i className="fas fa-user circle blue-text text-darken-2 grey lighten-2"></i>  
          <div>
            {user.userType === 'employee' ? (
              <span className="comment-user-type cyan darken-1 white-text">Employee</span>
            ) : (
              <span className="comment-user-type indigo darken-2 white-text">Technician</span>
            )}
            
            <span className="right grey-text">
              <Moment fromNow className="comment-time">
                {createdAt !== updatedAt ? updatedAt : createdAt}
              </Moment>
            </span>
          </div>
          <div>
            {user.id === current_user ? (
              <span className="comment-user blue-text text-darken-1">{user.firstName} {user.lastName}</span>
            ) : (
              <span className="comment-user">{user.firstName} {user.lastName}</span>
            )}
            <p className="comment-message">
              {message}
            </p>
            {user.id === current_user && (
              <a href="#1" className="right blue-text comment-label">
                edit
              </a>
            )}
          </div>          
        </li>
      </ul>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  current_user: PropTypes.string.isRequired
};

export default connect(null, null)(CommentItem);