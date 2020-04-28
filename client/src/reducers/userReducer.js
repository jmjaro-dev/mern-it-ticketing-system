import {
  GET_TECHS,
  USER_ERROR,
  SET_USERLOADING,
  RESET_USER_STATE
} from '../actions/types';

const initialState = {
  techs: null,
  error: null,
  userLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        userLoading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_USERLOADING:
      return {
        ...state,
        userLoading: true
      }
    case RESET_USER_STATE:
      return {
        techs: null,
        error: null,
        userLoading: false
      }
    default:
      return state;
  }
}