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
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  authLoading: false,
  user: null,
  authError: null,
  userError: null,
  accountError: null,
  nameError: null,
  emailError: null,
  passError: null,
  nameUpdateStatus: null,
  emailUpdateStatus: null,
  accountDeleteStatus: null,
  passwordChangeStatus: null,
  previousUrl: '/'
}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
        user: action.payload
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        passError: null,
        passwordChangeStatus: 'success',
        authLoading: false
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        user: action.payload,
        emailError: null,
        emailUpdateStatus: 'success',
        authLoading: false
      }
    case UPDATE_USER_NAME : 
      return {
        ...state,
        user: action.payload,
        nameError: null,
        nameUpdateStatus: 'success',
        authLoading: false
      }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        accountDeleteStatus: 'success',
        authLoading: false
      }
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        authLoading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        authLoading: false,
        user: null,
        authError: action.payload,
        userError: null,
        accountError: null,
        nameError: null,
        emailError: null,
        passError: null,
        nameUpdateStatus: null,
        emailUpdateStatus: null,
        accountDeleteStatus: null,
        passwordChangeStatus: null
      };
    case ACCOUNT_ERROR: 
      return {
        ...state,
        accountError: action.payload,
        accountDeleteStatus: 'failed',
        authLoading:false
      }
    case USER_NAME_ERROR: 
      return {
        ...state,
        nameError: action.payload,
        nameUpdateStatus: 'failed',
        authLoading:false
      }
    case EMAIL_ERROR: 
      return {
        ...state,
        emailError: action.payload,
        emailUpdateStatus: 'failed',
        authLoading:false
      }
    case PASSWORD_ERROR: 
      return {
        ...state,
        passError: action.payload,
        passwordChangeStatus: 'failed',
        authLoading:false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        authError: null,
        userError: null,
        accountError: null,
        emailError: null,
        passError: null,
      }
    case SET_PREVIOUS_URL:
      return {
        ...state,
        previousUrl: action.payload
      }
    case SET_AUTHLOADING:
      return {
        ...state,
        authLoading: true
      }
    case RESET_STATUS:
      switch(action.payload) {
        case 'name' :
          return {
            ...state,
            nameUpdateStatus: null
          }
        case 'email' :
          return {
            ...state,
            emailUpdateStatus: null
          }
        case 'account':
          return {
            ...state,
            accountDeleteStatus: null,
          }
        case 'password': 
          return {
            ...state,
            passwordChangeStatus: null
          }
        default:
          return {
            ...state
          }
      }
    default:
      return state;
  }
}