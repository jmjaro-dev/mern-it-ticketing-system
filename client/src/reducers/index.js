import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import ticketReducer from './ticketReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  alert: alertReducer,
  ticket: ticketReducer
});