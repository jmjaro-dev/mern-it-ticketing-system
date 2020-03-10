import {
  SET_ALERT,
  REMOVE_ALERT
} from './types';
import * as uuid from 'uuid';

// Set Alert
export default setAlert = (msg, type, timeout = 5000) => async dispatch => {
  const id = uuid.v4();
  
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({
    type: REMOVE_ALERT, payload: id
  }), timeout);
};