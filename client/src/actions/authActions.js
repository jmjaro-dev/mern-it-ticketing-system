import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  setLoading();

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
      payload: err.response.statusText
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  setLoading();

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
    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.statusText
    });
  }
};

// Login User
export const login = formData => async (dispatch) => {
  setLoading();

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const res = await axios.post('/api/auth', formData, config);
    const data = res.json();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
    loadUser();
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

// Clear Errors
export const clearErrors = () => async dispatch => dispatch({ type: CLEAR_ERRORS });

// Set loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
}