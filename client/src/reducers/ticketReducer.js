import {
  GET_TICKET,
  GET_TICKETS,
  SORT_TICKETS,
  SORT_TICKETS_DASHBOARD,
  ADD_TICKET,
  DELETE_TICKET,
  SET_OWNED_TICKETS,
  SET_ASSIGNED_TICKETS,
  SET_UNASSIGNED_TICKETS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  UPDATE_NAME_ON_TICKETS,
  FILTER_TICKETS,
  SET_FILTER,
  SET_SORTING,
  RESET_SORT,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  SET_TICKET_EXISTS,
  SET_CURRENT_TICKET_EXISTS,
  CLEAR_CURRENT_TICKET_EXISTS,
  SET_TICKETLOADING,
  RESET_TICKET_STATE
} from '../actions/types';

const initialState = {
  tickets: null,
  current: null,
  active_filter_tickets: 'All Tickets',
  active_filter_dashboard: 'all',
  mapped: null,
  sorted: null,
  sorting: {
    isSorted: false,
    field: null,
    order: null
  },
  filtered: null,
  owned: null,
  assigned: null,
  unassigned: null,
  error: null,
  ticketLoading: false,
  isAscending: false,
  ticket_exists: false,
  current_ticket_exists: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TICKET:
      return {
        ...state,
        current: {
          ticket: action.payload.ticket,
          current_url: action.payload.current_url
        },
        ticketLoading: false
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        mapped: action.payload.map(ticket => ticket),
        ticketLoading: false
      };
    case SORT_TICKETS:
      switch(action.payload) {
        case '_id':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => a._id-b._id ),
              filtered: state.filtered.sort((a, b) => a._id-b._id ),
              isAscending: !state.isAscending
            }
          }
          
          if(state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => b._id-a._id ),
              filtered: state.filtered.sort((a, b) => b._id-a._id ),
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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

                if(titleA < titleB) {
                  return -1;
                }

                if(titleA > titleB) {
                  return 1;
                }

                return 0; 
              }),
              filtered: state.filtered.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if(titleA < titleB) {
                  return -1;
                }

                if(titleA > titleB) {
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

                if(titleA > titleB) {
                  return -1;
                }

                if(titleA < titleB) {
                  return 1;
                }

                return 0; 
              }),
              filtered: state.filtered.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if(titleA > titleB) {
                  return -1;
                }

                if(titleA < titleB) {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
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
              filtered: state.filtered.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB - dateA; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        case 'assignedTo':
          if(!state.isAscending) {
            return {
              ...state,
              sorted: state.mapped.sort((a, b) => {
                let assignedToA, assignedToB;

                if(!a.assignedTo.to) {
                  assignedToA = a.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToA = a.assignedTo.to
                }

                if(!b.assignedTo.to) {
                  assignedToB = b.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToB = b.assignedTo.to
                }
                                
                if(assignedToA < assignedToB) {
                  return -1;
                }

                if(assignedToA > assignedToB) {
                  return 1;
                }

                return 0; 
              }),
              filtered: state.filtered.sort((a, b) => {
                let assignedToA, assignedToB;

                if(!a.assignedTo.to) {
                  assignedToA = a.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToA = a.assignedTo.to
                }

                if(!b.assignedTo.to) {
                  assignedToB = b.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToB = b.assignedTo.to
                }
                                
                if(assignedToA < assignedToB) {
                  return -1;
                }

                if(assignedToA > assignedToB) {
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
                let assignedToA, assignedToB;

                if(!a.assignedTo.to) {
                  assignedToA = a.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToA = a.assignedTo.to
                }

                if(!b.assignedTo.to) {
                  assignedToB = b.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToB = b.assignedTo.to
                }
                
                if(assignedToA > assignedToB) {
                  return -1;
                }

                if(assignedToA < assignedToB) {
                  return 1;
                }

                return 0; 
              }),
              filtered: state.filtered.sort((a, b) => {
                let assignedToA, assignedToB;

                if(!a.assignedTo.to) {
                  assignedToA = a.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToA = a.assignedTo.to
                }

                if(!b.assignedTo.to) {
                  assignedToB = b.assignedTo.firstName.toLowerCase();
                } else {
                  assignedToB = b.assignedTo.to
                }
                
                if(assignedToA > assignedToB) {
                  return -1;
                }

                if(assignedToA < assignedToB) {
                  return 1;
                }

                return 0; 
              }),
              isAscending: !state.isAscending
            }
          }
          break;
        default: 
          return state;
      }
      break;
    case SORT_TICKETS_DASHBOARD:
      switch(action.payload.field) {
        case '_id':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => a._id-b._id),
                filtered: state.filtered.sort((a, b) => a._id-b._id),
                unassigned: state.unassigned.sort((a, b) => a._id-b._id),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => a._id-b._id),
                filtered: state.filtered.sort((a, b) => a._id-b._id),
                unassigned: state.unassigned.sort((a, b) => a._id-b._id),
                isAscending: !state.isAscending
              }
            }
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => b._id-a._id),
                filtered: state.filtered.sort((a, b) => b._id-a._id),
                unassigned: state.unassigned.sort((a, b) => b._id-a._id),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => b._id-a._id),
                filtered: state.filtered.sort((a, b) => b._id-a._id),
                unassigned: state.unassigned.sort((a, b) => b._id-a._id),
                isAscending: !state.isAscending
              }
            }
          }
          break;
        case 'status':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusA - statusB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusA - statusB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusA - statusB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusA - statusB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusB - statusA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusB - statusA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusB - statusA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let statusA, statusB;

                  if(a.status ==='open') { statusA = 1 };
                  if(a.status ==='pending') { statusA = 2 };
                  if(a.status ==='closed') { statusA = 3 };
                  
                  if(b.status ==='open') { statusB = 1 };
                  if(b.status ==='pending') { statusB = 2 };
                  if(b.status ==='closed') { statusB = 3 };

                  return statusB - statusA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          break;
        case 'alertLevel':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertA - alertB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertA - alertB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertA - alertB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertA - alertB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertB - alertA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertB - alertA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertB - alertA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let alertA, alertB;

                  if(a.priority ==='low') { alertA = 1 };
                  if(a.priority ==='normal') { alertA = 2 };
                  if(a.priority ==='high') { alertA = 3 };
                  
                  if(b.priority ==='low') { alertB = 1 };
                  if(b.priority ==='normal') { alertB = 2 };
                  if(b.priority ==='high') { alertB = 3 };

                  return alertB - alertA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          break;
        case 'title':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA < titleB) {
                    return -1;
                  }
  
                  if(titleA > titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const titleA = a.title.toLowerCase();
                  const titleB = b.title.toLowerCase();
  
                  if(titleA > titleB) {
                    return -1;
                  }
  
                  if(titleA < titleB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          break;
        case 'issuedBy':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
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
                filtered: state.filtered.sort((a, b) => {
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
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
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
                filtered: state.filtered.sort((a, b) => {
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
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
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
                filtered: state.filtered.sort((a, b) => {
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
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
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
                filtered: state.filtered.sort((a, b) => {
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
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          break;
        case 'priorityLevel':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityA - priorityB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityA - priorityB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityA - priorityB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityA - priorityB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityB - priorityA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityB - priorityA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityB - priorityA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let priorityA, priorityB;
  
                  if(a.priority ==='low') { priorityA = 1 };
                  if(a.priority ==='normal') { priorityA = 2 };
                  if(a.priority ==='high') { priorityA = 3 };
                  
                  if(b.priority ==='low') { priorityB = 1 };
                  if(b.priority ==='normal') { priorityB = 2 };
                  if(b.priority ==='high') { priorityB = 3 };
  
                  return priorityB - priorityA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
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
          }
          break;
        case 'dateIssued':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                unassigned: state.filtered.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateA - dateB; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
  
                  return dateB - dateA; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          break;
        case 'assignedTo':
          if(!state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                                  
                  if(assignedToA < assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA > assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          
          if(state.isAscending) {
            if(action.payload.userType !== 'employee') {
              return {
                ...state,
                sorted: state.assigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            } else {
              return {
                ...state,
                sorted: state.owned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                filtered: state.filtered.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                unassigned: state.unassigned.sort((a, b) => {
                  let assignedToA, assignedToB;
  
                  if(!a.assignedTo.to) {
                    assignedToA = a.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToA = a.assignedTo.to
                  }
  
                  if(!b.assignedTo.to) {
                    assignedToB = b.assignedTo.firstName.toLowerCase();
                  } else {
                    assignedToB = b.assignedTo.to
                  }
                  
                  if(assignedToA > assignedToB) {
                    return -1;
                  }
  
                  if(assignedToA < assignedToB) {
                    return 1;
                  }
  
                  return 0; 
                }),
                isAscending: !state.isAscending
              }
            }
          }
          break;
        default: 
          return state;
      }
      break;
    case ADD_TICKET:
      if(state.sorted !== null && state.filtered !== null) {
        if(action.payload.userType === 'employee') {
          return {
            ...state,
            tickets: [action.payload.ticket, ...state.tickets],
            owned: [action.payload.ticket, ...state.owned],
            mapped:  [action.payload.ticket, ...state.tickets],
            sorted:  [action.payload.ticket, ...state.tickets],
            filtered:  [action.payload.ticket, ...state.filtered]
          };
        } else {
          return {
            ...state,
            tickets: [action.payload.ticket, ...state.tickets],
            assigned: [action.payload.ticket, ...state.assigned],
            mapped:  [action.payload.ticket, ...state.tickets],
            sorted:  [action.payload.ticket, ...state.tickets],
            filtered:  [action.payload.ticket, ...state.filtered]
          };
        }
      } else {
        if(state.filtered !== null) {
          if(action.payload.userType === 'employee') {
            return {
              ...state,
              tickets: [action.payload.ticket, ...state.tickets],
              mapped:  [action.payload.ticket, ...state.tickets],
              owned: [action.payload.ticket, ...state.owned],
              filtered:  [action.payload.ticket, ...state.filtered]
            };
          } else {
            return {
              ...state,
              tickets: [action.payload.ticket, ...state.tickets],
              mapped:  [action.payload.ticket, ...state.tickets],
              assigned: [action.payload.ticket, ...state.assigned],
              filtered:  [action.payload.ticket, ...state.filtered]
            };
          }   
        } else {
          if(action.payload.userType === 'employee') {
            return {
              ...state,
              tickets: [action.payload.ticket, ...state.tickets],
              mapped:  [action.payload.ticket, ...state.tickets],
              owned: [action.payload.ticket, ...state.owned]
            };
          } else {
            return {
              ...state,
              tickets: [action.payload.ticket, ...state.tickets],
              mapped:  [action.payload.ticket, ...state.tickets],
              assigned: [action.payload.ticket, ...state.assigned]
            };
          }  
        }
      }
    case UPDATE_TICKET:
      if(action.payload.current_url === 'tickets') {
        if(state.sorted !== null && state.filtered !== null) {
          return {
            ...state,
            tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
            mapped:  state.mapped.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
            sorted:  state.sorted.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
            filtered:  state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
            unassigned: state.unassigned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket) 
          }
        } else {
          if(state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              mapped:  state.mapped.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              filtered:  state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket)
            }
          } else {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              mapped:  state.mapped.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket)
            }
          }
        }
      } else if (action.payload.current_url === 'ticket') {
        if(action.payload.userType !== 'employee') {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
              sorted: state.sorted.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
              unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
              current: {
                ticket: action.payload.ticket,
                current_url: action.payload.current_url
              }
            }
          } else {
            if(state.filtered !== null) {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            } else {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            }
          }
        } else {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              sorted: state.sorted.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID),
              current: {
                ticket: action.payload.ticket,
                current_url: action.payload.current_url
              }
            }
          } else {
            if(state.filtered !== null) {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            } else {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            }
          }
        }
      } else {
        if(action.payload.userType !== 'employee') {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
              sorted: state.sorted.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
              unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
              current: {
                ticket: action.payload.ticket,
                current_url: action.payload.current_url
              }
            }
          } else {
            if(state.filtered !== null) {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            } else {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                assigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo._id === action.payload.userID),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned'),
                current: {
                  ticket: action.payload.ticket,
                  current_url: action.payload.current_url
                }
              }
            }
          }
        } else {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              sorted: state.sorted.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
              unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID)
            }
          } else {
            if(state.filtered !== null) {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                filtered: state.filtered.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID)
              }
            } else {
              return {
                ...state,
                tickets: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                owned: state.owned.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
                unassigned: state.tickets.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket).filter(ticket => ticket.assignedTo.to === 'Unassigned' && ticket.issuedBy._id === action.payload.userID)
              }
            }
          }
        }
      }
    case UPDATE_NAME_ON_TICKETS:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          return action.payload.forEach(updated_ticket => {
            if(ticket._id === updated_ticket._id) {
              return updated_ticket;
            } 
          });
        })
      }
    case DELETE_TICKET:
      if(action.payload.current_url === 'tickets') {
        if(state.sorted !== null && state.filtered !== null) {
          return {
            ...state,
            tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
            mapped:  state.mapped.filter(ticket => ticket._id !== action.payload.id),
            sorted:  state.sorted.filter(ticket => ticket._id !== action.payload.id),
            filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
          };
        } else {
          return {
            ...state,
            tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
            mapped:  state.mapped.filter(ticket => ticket._id !== action.payload.id),
            filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
          };
        }
        
      } else {
        if(action.payload.userType !== 'employee') {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
              assigned:  state.assigned.filter(ticket => ticket._id !== action.payload.id),
              sorted:  state.sorted.filter(ticket => ticket._id !== action.payload.id),
              filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
            };
            
          } else {
            return {
              ...state,
              tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
              assigned:  state.assigned.filter(ticket => ticket._id !== action.payload.id),
              filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
            }
          }
        } else {
          if(state.sorted !== null && state.filtered !== null) {
            return {
              ...state,
              tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
              owned:  state.owned.filter(ticket => ticket._id !== action.payload.id),
              sorted:  state.sorted.filter(ticket => ticket._id !== action.payload.id),
              filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
            };
            
          } else {
            return {
              ...state,
              tickets: state.tickets.filter(ticket => ticket._id !== action.payload.id),
              owned:  state.owned.filter(ticket => ticket._id !== action.payload.id),
              filtered:  state.filtered.filter(ticket => ticket._id !== action.payload.id)
            }
          }
        }
      }   
    case CLEAR_TICKETS: 
      return {
        ...state,
        tickets: null,
        mapped: null,
        sorted: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_OWNED_TICKETS: 
      return {
        ...state,
        owned: state.tickets.filter(ticket => ticket.issuedBy._id === action.payload)
      }
    case SET_ASSIGNED_TICKETS: 
      return {
        ...state,
        assigned: state.tickets.filter(ticket => ticket.assignedTo._id === action.payload)
      }
    case SET_UNASSIGNED_TICKETS: 
      switch(action.payload.userType) {
        case 'employee':
          return {
            ...state,
            unassigned: state.tickets.filter(ticket => ticket.issuedBy._id === action.payload.id && ticket.assignedTo.to === 'Unassigned')
          }
        case 'technician': 
          return {
            ...state,
            unassigned: state.tickets.filter(ticket => ticket.assignedTo.to === 'Unassigned')
          }
        default:
          return {
            ...state,
          }
      }
    case SET_CURRENT:
      return {
        ...state,
        current: {
          ticket: action.payload.ticket,
          current_url: action.payload.current_url
        }
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
          return ticket._id.toString().match(regex) || ticket.title.match(regex) || ticket.description.match(regex) || ticket.priority.match(regex) || ticket.status.match(regex) || ticket.issuedBy.firstName.match(regex) || ticket.issuedBy.lastName.match(regex);
        }),
        mapped: state.tickets.filter(ticket => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return ticket._id.toString().match(regex) || ticket.title.match(regex) || ticket.description.match(regex) || ticket.priority.match(regex) || ticket.status.match(regex) || ticket.issuedBy.firstName.match(regex) || ticket.issuedBy.lastName.match(regex);
        }) 
      };
    case SET_FILTER:
      if(action.payload.current_url !== 'dashboard') {
        return {
          ...state,
          active_filter_tickets: action.payload.filter,
          mapped: action.payload.tickets,
          sorted: action.payload.tickets,
          filtered: action.payload.tickets
        };
      } else {
        if(action.payload.userType === 'employee') {
          return {
            ...state,
            active_filter_dashboard: action.payload.filter,
            owned: action.payload.tickets,
            filtered: action.payload.tickets
          };
        } else {
          return {
            ...state,
            active_filter_dashboard: action.payload.filter,
            assigned: action.payload.tickets,
            filtered: action.payload.tickets
          };
        }
      }
      
    case SET_SORTING:
      return {
        ...state,
        sorting: {
          isSorted: action.payload.isSorted,
          field: action.payload.field,
          order: action.payload.order
        }
      }
    case RESET_SORT:
      return {
        ...state,
        sorting:  {
          isSorted: false,
          field: null,
          order: null
        },
        sorted: null
      }
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
    case SET_TICKET_EXISTS:
      return {
        ...state,
        ticket_exists: action.payload
      }
    case SET_CURRENT_TICKET_EXISTS:
      return {
        ...state,
        current_ticket_exists: true
      }
    case CLEAR_CURRENT_TICKET_EXISTS:
      return {
        ...state,
        current_ticket_exists: false
      }
    case SET_TICKETLOADING:
      return {
        ...state,
        ticketLoading: true
      }
    case RESET_TICKET_STATE:
      localStorage.removeItem('currentTicket');
      return {
        tickets: null,
        current: null,
        active_filter_tickets: 'All Tickets',
        active_filter_dashboard: 'all',
        mapped: null,
        sorted: null,
        sorting: {
          isSorted: false,
          field: null,
          order: null
        },
        filtered: null,
        owned: null,
        assigned: null,
        unassigned: null,
        error: null,
        ticketLoading: false,
        isAscending: false,
        ticket_exists: false,
        current_ticket_exists: false
      }
    default:
      return state;
  }
}