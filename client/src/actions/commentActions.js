import axios from 'axios';
import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_NAME_ON_COMMENTS,
  COMMENT_ERROR,
  SET_CURRENT_COMMENT,
  SET_EDIT_MODE,
  CLEAR_CURRENT_COMMENT,
  RESET_COMMENT_STATE
} from './types';

// Get Comments by Ticket Id
export const getComments = ticket_id => async dispatch => {
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

// Add Comment depending on ticket that matches the ticket_id 
export const addComment = (ticket_id, message, userInfo) => async dispatch => {  
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

// Update Comment
export const updateComment = (comment_id, newCommentInfo) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/comments/${comment_id}`, newCommentInfo, config);

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

// Update the name on own Comments
export const updateNameOnComments = user => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    // Update User's name in comments database
    const res = await axios.put(`/api/users/comments/${user.id}`, user, config);

    dispatch({
      type: UPDATE_NAME_ON_COMMENTS,
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
export const deleteComment = id => async dispatch => {
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

// Set Curent Comment
export const setCurrent = comment => async dispatch => dispatch({ type: SET_CURRENT_COMMENT, payload: comment });

// Set Edit Mode 
export const setEditMode = () => async dispatch => dispatch({ type: SET_EDIT_MODE });

// Clear Current Comment
export const clearCurrent = () => async dispatch => dispatch({ type: CLEAR_CURRENT_COMMENT });

// Reset Comment State on Log out
export const resetCommentState = () => async dispatch => dispatch({ type: RESET_COMMENT_STATE });