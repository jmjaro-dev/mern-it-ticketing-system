import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  UPDATE_USER_NAME,
  AUTH_ERROR,
  USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  // Set global header token
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Login User
export const login = formData => async (dispatch) => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
    
    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Logout
export const logout = () => async dispatch => dispatch({ type: LOGOUT });

// Update User's Name
export const updateUserName = user => async dispatch => {
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

    // Update User's name in users database
    const res = await axios.put(`/api/users/${user.id}`, user, config);

    dispatch({
      type: UPDATE_USER_NAME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.msg
    });
  }
};
