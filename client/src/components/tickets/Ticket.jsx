import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getTicket, setCurrent, clearCurrent, setTicketExists } from '../../actions/ticketActions';
import { getComments } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../comments/Comments';
import AddComment from '../comments/AddComment';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';


const Ticket = ({ match, user, ticket, ticket_exists, comments, loading, getTicket, getComments, setCurrent, clearCurrent, setTicketExists }) => {
  useEffect(() => {
    if(user) {
      getTicket(match.params.id);
      getComments(match.params.id);
      setCurrent(ticket);    
      setTicketExists(true);
    }
    // eslint-disable-next-line
  }, []);

  const onBack = () => {
    clearCurrent();
    setTicketExists(false);
  }
  
  // Opens Modal
  const openModal = name => {
    let instance = M.Modal.getInstance(document.getElementById(name));
    instance.open();
  }

  const onUpdate = e => {
    e.preventDefault();
    setCurrent(ticket);
    openModal("update-ticket-modal");
  }
  const onDelete = e => {
    e.preventDefault();
    setCurrent(ticket);
    openModal("delete-ticket-modal");
  }

  return (
    <Fragment>
      {ticket && ticket_exists && !loading ? (
        <div id="ticketContainer">
          {/* Ticket Details */}
          <div>
            {/* Left Panel */}
            <div className="row">
              {/* Ticket Info */}
              {/* Navigation & actions*/}
              <div className="row">
                <span className="left ticket-links">
                  <Link to="/" className="grey-text text-darken-2" onClick={onBack}>
                    <FontAwesomeIcon icon="chevron-left"/>
                    <span className="btn-label"> Back to Tickets</span>
                  </Link>
                </span>  
              </div>
              <div className="col s9" id="ticket-left-panel">
                {/* Ticket info Section */}
                <div className="card-panel">
                  {/* Ticket Title, Alert Level, IssuedBy, DateIssued*/}
                  <div className="center ticket-details">Ticket Information</div>
                  <div className="row">
                    <div className="col s12">
                      {/* Ticket ID */}
                      <span className="ticket-label">[ Ticket ID ]</span> {' '}
                      <span className="ticket-details black-text">{ticket._id} </span>
                    </div>
                    <div className="col s12">
                      {/* Title */}
                      <span className="ticket-label">[ Subject ]</span> {' '}
                      <span id="ticket-title" className="blue-text text-darken-2">{ticket.title}</span>
                    </div>
                    <div className="col s12">
                      <span className="ticket-label">
                        [ Issued By ] 
                      </span> <span className="ticket-details">{ticket.issuedBy.firstName} {' '} {ticket.issuedBy.lastName} </span>
                    </div>
                    <div className="col s12">
                      <span className="ticket-label">[ Date Issued ]</span> {' '}
                      <Moment format="MM-DD-YYYY, " className="ticket-details">
                      {ticket.createdAt} 
                      </Moment>
                      <span className="ticket-details"> @ </span>
                      <Moment format="h:mm A" className="ticket-details">
                      {ticket.createdAt} 
                      </Moment>
                    </div>
                  </div>                  
                  <div className="divider"></div>
                  {/* Ticket Description */}
                  <p>
                    <span className="ticket-label">
                      Description <FontAwesomeIcon icon="chevron-right"/> 
                    </span> <span className="ticket-desc">{ticket.description}</span>
                  </p>
                </div>
                {/* Comments Section */}
                <div className="divider"></div>
                <p className="center section-label"> 
                    Comments
                </p>   
                <div>
                  {ticket ? ( 
                    <div className="collection card-panel comment-container">
                      <Comments ticket_id={ticket._id} current_user={user._id}/>
                    </div>
                    ) : (
                    <PreLoader />
                  )}
                </div>
                {/* Comment Box for Ticket owner or Assigned Technician */}
                {(ticket.issuedBy._id === user._id || ticket.assignedTo._id === user._id) && (
                  <Fragment>
                    <div className="divider"></div>
                    <p className="center section-label"> 
                        Write a Comment
                    </p>
                    <div>
                      {comments && (
                        <AddComment user={user} ticket_id={ticket._id}/>
                      )}
                    </div>
                  </Fragment>
                )}
              </div> 
              {/* Right Panel */}
              <div className="col s3 card-panel" id="ticket-right-panel">
                <div className="center ticket-details">Other Details</div>
                <p>
                  {/* Lastest Update */}
                  <span className="ticket-label">Latest Update <FontAwesomeIcon icon="chevron-right"/> </span>
                  <Moment fromNow className="ticket-details">
                  {ticket.updatedAt} 
                  </Moment>
                  <br/>
                  {/* Status */}
                  <span className="ticket-label">Status <FontAwesomeIcon icon="chevron-right"/> </span> 
                  {(ticket.status === 'open') && (
                    <span className="ticket-details green-text text-darken-2">{ticket.status}</span> 
                  )}
                  {(ticket.status === 'pending') && (
                    <span className="ticket-details orange-text text-darken-2">{ticket.status}</span> 
                  )}
                  {(ticket.status === 'closed') && (
                    <span className="ticket-details red-text text-darken-2">{ticket.status}</span> 
                  )}
                  <br/>
                  {/* Priority Level */}
                  <span className="ticket-label">Priority Level <FontAwesomeIcon icon="chevron-right"/> </span>
                  {(ticket.priority === 'low') && (
                    <span className="priority-badge ticket-details grey-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="priority-badge ticket-details green-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="priority-badge ticket-details red-text text-darken-2">{ticket.priority}</span>
                  )}
                  <br/>
                  {/* Alert Level */}
                  <span className="ticket-label">Alert Level <FontAwesomeIcon icon="chevron-right"/> </span>{' '}
                  {(ticket.priority === 'low') && (
                    <span className="priority-badge ticket-details grey-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="priority-badge ticket-details green-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="priority-badge ticket-details red-text text-darken-2">{ticket.priority}</span>
                  )}
                  <br/>
                  {/* Assigned To */}
                  <span className="ticket-label"> Assigned to <FontAwesomeIcon icon="chevron-right"/> </span>{' '}
                  {ticket.assignedTo._id !== user._id ? (
                    <Fragment>
                      <span className="ticket-details">
                        {ticket.assignedTo.to !== 'Unassigned' ? (
                          <Fragment>
                            {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
                          </Fragment>
                        ) : (
                          <Fragment>
                            {ticket.assignedTo.to}
                          </Fragment>
                        )}
                      </span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <span className="ticket-details blue-text">
                        {user.firstName} {user.lastName}
                      </span>
                    </Fragment>
                  )}
                </p> 
                {/* Show update action for Technicians if Ticket is Unassigned */}
                {ticket.assignedTo.to === 'Unassigned' && user.userType === 'technician' && (
                  <Fragment>
                    <div className="divider"></div>
                    <div className="center ticket-actions-header">Actions</div>
                    <div className="ticket-actions-container row">
                      <div className="col s12 m6 center">
                        <a href="#!" onClick={onUpdate}>
                          <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
                          <span className="ticket-actions-label grey-text text-darken-2">update</span>
                        </a>
                      </div>
                    </div>
                  </Fragment>
                )}  
                {/* Show Actions for Ticket owner && Assigned Technician */}
                {(ticket.issuedBy._id === user._id || ticket.assignedTo._id === user._id) && (
                  <Fragment>
                    <div className="divider"></div>
                    <div className="center ticket-actions-header">Actions</div>
                    <div className="ticket-actions-container row">
                      <div className="col s12 m6 center">
                        <a href="#!" onClick={onUpdate}>
                          <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
                          <span className="ticket-actions-label grey-text text-darken-2">update</span>
                        </a>
                      </div>
                      {/* Show delete action for ticket owner only */}
                      {ticket.issuedBy._id === user._id && (
                        <div className="col s12 m6 center">
                          <a href="#!" onClick={onDelete}>
                            <FontAwesomeIcon icon={[ "far", "trash-alt" ]} className="red-text text-darken-2" />
                            <span className="ticket-actions-label grey-text text-darken-2"> delete</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}  
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          {!ticket && !ticket_exists ? (
            <Redirect to="/" />
          ) : (
            <PreLoader/>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

Ticket.propTypes = {
  user: PropTypes.object.isRequired,
  ticket: PropTypes.object,
  ticket_exists: PropTypes.bool,
  comments: PropTypes.array,
  loading: PropTypes.bool,
  getTicket: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setTicketExists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  ticket: state.ticket.current,
  ticket_exists: state.ticket.ticket_exists,
  loading: state.ticket.loading,
  comments: state.comment.comments
});

export default connect(mapStateToProps, { getTicket, getComments, setCurrent, clearCurrent, setTicketExists })(Ticket);