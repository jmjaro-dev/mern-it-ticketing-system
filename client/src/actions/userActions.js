import axios from 'axios';
import {
  GET_TECHS,
  USER_ERROR,
  SET_LOADING
} from './types';


// Get All Technicians
export const getTechs = () => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get('/api/users/techs');
  
    dispatch({
      type: GET_TECHS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.msg
    });
  }
};