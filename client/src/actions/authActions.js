import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USER_NAME,
  AUTH_ERROR,
  ACCOUNT_ERROR,
  USER_NAME_ERROR,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  DELETE_ACCOUNT,
  SET_PREVIOUS_URL,
  SET_AUTHLOADING,
  RESET_STATUS
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_AUTHLOADING
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
    type: SET_AUTHLOADING
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
    type: SET_AUTHLOADING
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

// Update User's Email
export const updateEmail = user => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_AUTHLOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Update User's email in users database
    const res = await axios.put(`/api/users/update/email/${user.id}`, user, config);

    dispatch({
      type: UPDATE_EMAIL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EMAIL_ERROR,
      payload: err.response.data.msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Update User's Password
export const updatePassword = (user_id, passwords) => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_AUTHLOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Update User's password in users database
    const res = await axios.put(`/api/users/update/password/${user_id}`, passwords, config);

    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data.msg
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: err.response.data.msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Update User's Name
export const updateUserName = user => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_AUTHLOADING
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
      type: USER_NAME_ERROR,
      payload: err.response.msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Delete User Account
export const deleteAccount = (id, password) => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_AUTHLOADING
  });

  const config = {
    headers: {
      password
    }
  }

  try {
    // Delete user in users database
    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: DELETE_ACCOUNT });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: err.response.data.msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    }, 4000);
  }
};

// Set Previous URL
export const setPreviousUrl = url => async dispatch => dispatch({ type: SET_PREVIOUS_URL, payload: url });

// Reset Status
export const resetStatus = status => async dispatch => dispatch({ type: RESET_STATUS, payload: status });