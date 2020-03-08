import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  try {
    setLoading();

    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get(/api/auth);
  
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
export const register = (formData) => async dispatch => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

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
export const login = formData => async dispatch => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.statusText
    });
  }
};

// Logout
export const logout = () => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => dispatch({ type: CLEAR_ERRORS });