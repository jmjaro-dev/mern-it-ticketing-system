import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import ticketReducer from './ticketReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  alert: alertReducer,
  ticket: ticketReducer,
  comment: commentReducer
});