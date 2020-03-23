import {
  GET_TICKET,
  GET_TICKETS,
  SORT_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  FILTER_TICKETS,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  tickets: null,
  current: null,
  sorted: null,
  filtered: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TICKET:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case SORT_TICKETS:
      return {
        ...state,
        sorted: action.payload,
        loading: false
      }
    case ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        loading: false
      };
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map(ticket => ticket._id === action.payload._id ? action.payload : ticket),
        loading: false 
      }
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload),
        loading: false
      };
    case CLEAR_TICKETS: 
      return {
        ...state,
        tickets: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_TICKETS:
      return {
        ...state,
        filtered: state.tickets.filter(ticket => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return ticket.title.match(regex) || ticket.description.match(regex) || ticket.issuedBy.firstName.match(regex) || ticket.issuedBy.lastName.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case TICKET_ERROR:
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