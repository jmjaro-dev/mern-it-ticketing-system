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
  SET_ALL,
  OWNED_TICKETS,
  OPEN_TICKETS,
  RESOLVED_TICKETS,
  CLOSED_TICKETS,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  tickets: null,
  current: null,
  mapped: null,
  sorted: null,
  filtered: null,
  owned: null,
  open: null,
  resolved: null,
  closed: null,
  error: null,
  loading: false,
  isAscending: false,
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
        mapped: action.payload.map(ticket => ticket),
        loading: false
      };
    case SORT_TICKETS:
      switch(action.payload) {
        case '_id':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => a._id-b._id ),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => b._id-a._id ),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'status':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let statusA, statusB;

                if(a.status ==='open') { statusA = 1 };
                if(a.status ==='pending') { statusA = 2 };
                if(a.status ==='closed') { statusA = 3 };
                
                if(b.status ==='open') { statusB = 1 };
                if(b.status ==='pending') { statusB = 2 };
                if(b.status ==='closed') { statusB = 3 };

                return statusA - statusB; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let statusA, statusB;

                if(a.status ==='open') { statusA = 1 };
                if(a.status ==='pending') { statusA = 2 };
                if(a.status ==='closed') { statusA = 3 };
                
                if(b.status ==='open') { statusB = 1 };
                if(b.status ==='pending') { statusB = 2 };
                if(b.status ==='closed') { statusB = 3 };

                return statusB - statusA; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'alertLevel':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let alertA, alertB;

                if(a.priority ==='low') { alertA = 1 };
                if(a.priority ==='normal') { alertA = 2 };
                if(a.priority ==='high') { alertA = 3 };
                
                if(b.priority ==='low') { alertB = 1 };
                if(b.priority ==='normal') { alertB = 2 };
                if(b.priority ==='high') { alertB = 3 };

                return alertA - alertB; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let alertA, alertB;

                if(a.priority ==='low') { alertA = 1 };
                if(a.priority ==='normal') { alertA = 2 };
                if(a.priority ==='high') { alertA = 3 };
                
                if(b.priority ==='low') { alertB = 1 };
                if(b.priority ==='normal') { alertB = 2 };
                if(b.priority ==='high') { alertB = 3 };

                return alertB - alertA; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'title':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if( titleA < titleB) {
                  return -1;
                }

                if( titleA > titleB) {
                  return 1;
                }

                return 0; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if( titleA > titleB) {
                  return -1;
                }

                if( titleA < titleB) {
                  return 1;
                }

                return 0; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'issuedBy':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const issuedByA = a.title.toLowerCase();
                const issuedByB = b.title.toLowerCase();

                if( issuedByA < issuedByB) {
                  return -1;
                }

                if( issuedByA > issuedByB) {
                  return 1;
                }

                return 0; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const issuedByA = a.title.toLowerCase();
                const issuedByB = b.title.toLowerCase();

                if( issuedByA > issuedByB) {
                  return -1;
                }

                if( issuedByA < issuedByB) {
                  return 1;
                }

                return 0; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'priorityLevel':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let priorityA, priorityB;

                if(a.priority ==='low') { priorityA = 1 };
                if(a.priority ==='normal') { priorityA = 2 };
                if(a.priority ==='high') { priorityA = 3 };
                
                if(b.priority ==='low') { priorityB = 1 };
                if(b.priority ==='normal') { priorityB = 2 };
                if(b.priority ==='high') { priorityB = 3 };

                return priorityA - priorityB; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let priorityA, priorityB;

                if(a.priority ==='low') { priorityA = 1 };
                if(a.priority ==='normal') { priorityA = 2 };
                if(a.priority ==='high') { priorityA = 3 };
                
                if(b.priority ==='low') { priorityB = 1 };
                if(b.priority ==='normal') { priorityB = 2 };
                if(b.priority ==='high') { priorityB = 3 };

                return priorityB - priorityA; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'dateIssued':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateA - dateB; 
              }),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB - dateA; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        default: 
          return state;
      }
      break;
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
        }),
        mapped: state.tickets.filter(ticket => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return ticket.title.match(regex) || ticket.description.match(regex) || ticket.issuedBy.firstName.match(regex) || ticket.issuedBy.lastName.match(regex);
        }) 
      };
    case SET_ALL:
      return {
        ...state,
        mapped: action.payload,
        filtered: action.payload,
    };
    case OWNED_TICKETS:
      return {
        ...state,
        owned: action.payload,
        mapped: action.payload,
        filtered: action.payload,
    };
    case OPEN_TICKETS:
      return {
        ...state,
        owned: action.payload,
        mapped: action.payload,
        filtered: action.payload,
      };
    case RESOLVED_TICKETS:
    return {
      ...state,
      owned: action.payload,
      mapped: action.payload,
      filtered: action.payload,
    };
    case CLOSED_TICKETS:
      return {
        ...state,
        owned: action.payload,
        mapped: action.payload,
        filtered: action.payload,
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