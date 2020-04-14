import axios from 'axios';
import {
  GET_TICKET,
  GET_TICKETS,
  SORT_TICKETS,
  SORT_TICKETS_PROFILE,
  ADD_TICKET,
  DELETE_TICKET,
  SET_OWNED_TICKETS,
  SET_ASSIGNED_TICKETS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  FILTER_TICKETS,
  SET_FILTER,
  SET_SORTING,
  RESET_SORT,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  SET_TICKET_EXISTS,
  SET_LOADING,
  RESET_TICKET_STATE
} from './types';

// Get Ticket by Id
export const getTicket = (id, current_url) => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: GET_TICKET,
      payload: {
        ticket: res.data,
        current_url
      }
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

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

// Sort Tickets
export const sortTickets = field => async dispatch => {

  dispatch({ 
    type: SORT_TICKETS, 
    payload: field 
  });
};

// Sort Tickets in Profile
export const sortTicketsProfile = ( field, userType ) => async dispatch => {
  const info = { field, userType }
  dispatch({ 
    type: SORT_TICKETS_PROFILE, 
    payload: info 
  });
};

// Add Ticket
export const addTicket = ticket => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/tickets', ticket, config);

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
export const updateTicket = (ticket, userType, current_url = 'home') => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/tickets/${ticket._id}`, ticket, config);

    dispatch({
      type: UPDATE_TICKET,
      payload: {
        data: res.data,
        current_url,
        userType
      }
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response
    });
  }
};

// Clear Tickets
export const clearTicket = () => async dispatch => dispatch({ type: CLEAR_TICKETS });

// Set Curent Ticket
export const setCurrent = (ticket, current_url) => async dispatch => dispatch({ 
  type: SET_CURRENT, 
  payload: { 
    ticket, 
    current_url 
  } 
});

// Set Ticket Exists
export const setTicketExists = exist => async dispatch => dispatch({ type: SET_TICKET_EXISTS, payload: exist });

// Set Owned Tickets
export const setOwnedTickets = id => async dispatch => dispatch({ type: SET_OWNED_TICKETS, payload: id });

// Set Assigned Tickets
export const setAssignedTickets = id => async dispatch => dispatch({ type: SET_ASSIGNED_TICKETS, payload: id });

// Clear Current Ticket
export const clearCurrent = () => async dispatch => dispatch({ type: CLEAR_CURRENT });

// Filter Tickets
export const filterTickets = text => async dispatch => dispatch({ type: FILTER_TICKETS, payload: text });

// Set Tickets by Filter
export const setFilter = (filter, tickets, current_url) => async dispatch => {
  dispatch({ type: SET_FILTER, payload: { filter, tickets, current_url } });
};

// Set Sorting method
export const setSort = sort_method => async dispatch => dispatch({ type: SET_SORTING, payload: sort_method });

// Reset Sorting method
export const resetSort = () => async dispatch => dispatch({ type: RESET_SORT });

// Clear Filter
export const clearFilter = () => async dispatch => dispatch({ type: CLEAR_FILTER });

// Reset Ticket State on Log out
export const resetTicketState = () => async dispatch => dispatch({ type: RESET_TICKET_STATE });