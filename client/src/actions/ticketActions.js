import axios from 'axios';
import {
  GET_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  FILTER_TICKETS,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR
} from './types';

// Get Tickets
export const getTickets = () => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get('/api/tickets');
  
    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Add Ticket
export const addTicket = formData => async dispatch => {
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

    const res = await axios.post('/api/tickets', formData, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete Ticket
export const deleteTicket = id => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    await axios.delete(`/api/tickets/${id}`);

    dispatch({
      type: DELETE_TICKET,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Update Ticket
export const updateTicket = ticket => async dispatch => {
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

    const res = await axios.put(`/api/tickets/${ticket._id}`, ticket, config);

    dispatch({
      type: UPDATE_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear Tickets
export const clearTicket = () => async dispatch => dispatch({ type: CLEAR_TICKETS });

// Set Ticket
export const setCurrent = ticket => async dispatch => dispatch({ type: SET_CURRENT, payload: ticket });

// Clear Current Ticket
export const clearCurrent = () => async dispatch => dispatch({ type: CLEAR_CURRENT });

// Filter Tickets
export const filterTickets = text => async dispatch => dispatch({ type: FILTER_TICKETS, payload: text });

// Clear Filter
export const clearFilter = () => async dispatch => dispatch({ type: CLEAR_FILTER });