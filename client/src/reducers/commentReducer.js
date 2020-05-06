import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_NAME_ON_COMMENTS,
  COMMENT_ERROR,
  SET_CURRENT_COMMENT,
  SET_EDIT_MODE,
  CLEAR_CURRENT_COMMENT,
  RESET_COMMENT_STATE
} from '../actions/types';

const initialState = {
  comments: null,
  current_comment: null,
  edit_mode: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => comment._id === action.payload._id ? action.payload : comment)
      }
    case UPDATE_NAME_ON_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload)
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        current_comment: action.payload
      };
    case SET_EDIT_MODE:
      return {
        ...state,
        edit_mode: !state.edit_mode
      };
    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        current_comment: null
      };
    case RESET_COMMENT_STATE:
      return {
        comments: null,
        current_comment: null,
        edit_mode: false,
        error: null
      }
    default:
      return state;
  }
}