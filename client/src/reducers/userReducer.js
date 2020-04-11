import {
  GET_TECHS,
  USER_ERROR,
  SET_LOADING,
  RESET_USER_STATE
} from '../actions/types';

const initialState = {
  techs: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case RESET_USER_STATE:
      return {
        techs: null,
        error: null,
        loading: false
      }
    default:
      return state;
  }
}