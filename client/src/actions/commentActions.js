import axios from 'axios';
import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  COMMENT_ERROR,
  SET_LOADING
} from './types';

// Get Comments by Ticket Id
export const getComments = ticket_id => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get(`/api/comments/${ticket_id}`);
  
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response.msg
    });
  }
};

// Add Comment depending on ticket_id 
export const addComment = (ticket_id, message, userInfo) => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });
  
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const formData = {
      message,
      userInfo
    }

    const res = await axios.post(`/api/comments/${ticket_id}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete Comment
export const deleteTicket = id => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    await axios.delete(`/api/comments/${id}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response.msg
    });
  }
};

// Update Comment
export const updateComment = comment => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/comments/${comment._id}`, comment, config);

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response.msg
    });
  }
};