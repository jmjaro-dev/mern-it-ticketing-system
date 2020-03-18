import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  COMMENT_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  comments: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => comment._id === action.payload._id ? action.payload : comment),
        loading: false 
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload),
        loading: false
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}