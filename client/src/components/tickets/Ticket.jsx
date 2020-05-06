import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getTicket, setCurrent, clearCurrent, setTicketExists } from '../../actions/ticketActions';
import { getComments } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../comments/Comments';
import AddCommentBtn from '../comments/AddCommentBtn';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';


const Ticket = ({ user, current, ticket_exists, comments, previousUrl, loading, getTicket, getComments, setCurrent, clearCurrent, setTicketExists }) => {
  const [updatedTicket, setUpdatedTicket] = useState(null);

  let current_ticket;

  useEffect(() => {
    if(user && current && updatedTicket === null) {
      getTicket(current.ticket._id);
      getComments(current.ticket._id);
      setCurrent(current.ticket, 'ticket');    
      setTicketExists(true);
      setUpdatedTicket(current.ticket);
    } 

    if(current && current.ticket && !loading) {
      current_ticket = JSON.stringify(current.ticket); 
      localStorage.setItem('currentTicket', current_ticket );
    }

    if(current && updatedTicket !== current.ticket && updatedTicket) {
      setUpdatedTicket(current.ticket);
      getTicket(current.ticket._id);
    }
    // eslint-disable-next-line
  }, [updatedTicket]);

  const onBack = () => {
    clearCurrent();
    setTicketExists(false);
    localStorage.removeItem('currentTicket');
  }
  
  // Opens Modal
  const openModal = name => {
    let instance = M.Modal.getInstance(document.getElementById(name));
    instance.open();
  }

  const onUpdate = e => {
    e.preventDefault();
    setCurrent(current.ticket, 'ticket');
    openModal("update-ticket-modal");
  }
  const onDelete = e => {
    e.preventDefault();
    setCurrent(current.ticket, 'ticket');
    openModal("delete-ticket-modal");
  }

  return (
    <Fragment>
      {current && ticket_exists && !loading ? (
        <Fragment>
          <AddCommentBtn />
          <div id="ticketContainer">
            {/* Ticket Details */}
            <div>
              {/* Left Panel */}
              <div className="row">
                {/* Ticket Info */}
                {/* Navigation & actions*/}
                <div className="row">
                  <span className="left ticket-links">
                    <Link to={previousUrl} className="grey-text text-darken-2" onClick={onBack}>
                      <FontAwesomeIcon icon="chevron-left"/>
                        <span className="btn-label"> 
                          Back to {previousUrl !== '/tickets' ? "Dashboard" : "Tickets"}
                        </span>
                    </Link>
                  </span>  
                </div>
                <div className="row">
                  <div className="col s12 m7 l8">
                    {/* Ticket info Section */}
                    <div className="card-panel">
                      {/* Ticket Title, Alert Level, IssuedBy, DateIssued*/}
                      <div className="center ticket-info-header" style={{ marginBottom: '1.5em' }}>
                        <FontAwesomeIcon icon="file-invoice"  className="blue-text text-darken-2" size="lg" style={{ marginRight: '0.5em' }} />
                        Ticket Information
                      </div>
                      <div className="row">
                        <div className="col s12">
                          {/* Ticket ID */}
                          <span className="ticket-label">[ Ticket ID ]</span> {' '}
                          <span className="ticket-details black-text">{current.ticket._id} </span>
                        </div>
                        <div className="col s12">
                          {/* Title */}
                          <span className="ticket-label">[ Subject ]</span> {' '}
                          <span id="ticket-title" className="blue-text text-darken-2">{current.ticket.title}</span>
                        </div>
                        <div className="col s12">
                          <span className="ticket-label">
                            [ Issued By ] 
                          </span> <span className="ticket-details">{current.ticket.issuedBy.firstName} {' '} {current.ticket.issuedBy.lastName} </span>
                        </div>
                        <div className="col s12">
                          <span className="ticket-label">[ Date Issued ]</span> {' '}
                          <Moment format="MM-DD-YYYY, " className="ticket-details">
                          {current.ticket.createdAt} 
                          </Moment>
                          <span className="ticket-details"> @ </span>
                          <Moment format="h:mm A" className="ticket-details">
                          {current.ticket.createdAt} 
                          </Moment>
                        </div>
                      </div>                  
                      <div className="divider"></div>
                      {/* Ticket Description */}
                      <p>
                        <span className="ticket-label">
                          Description <FontAwesomeIcon icon="chevron-right"/> 
                        </span> <span className="ticket-desc">{current.ticket.description}</span>
                      </p>
                    </div>
                  </div>
                  {/* Other Details Panel */}
                  <div className="col s12 m5 l4">
                    <div className="card-panel">
                      <div className="center ticket-info-header">Other Details</div>
                      <p>
                        {/* Lastest Update */}
                        <span className="ticket-label">Latest Update <FontAwesomeIcon icon="chevron-right"/> </span>
                        <Moment fromNow className="ticket-details">
                        {comments && current && comments.length !==0 && comments[0].updatedAt >= current.ticket.updatedAt ? comments[0].updatedAt : current.ticket.updatedAt} 
                        </Moment>
                        <br/>
                        {/* Status */}
                        <span className="ticket-label">Status <FontAwesomeIcon icon="chevron-right"/> </span> 
                        {(current.ticket.status === 'open') && (
                          <span className="ticket-details green-text text-darken-2">{current.ticket.status}</span> 
                        )}
                        {(current.ticket.status === 'pending') && (
                          <span className="ticket-details orange-text text-darken-2">{current.ticket.status}</span> 
                        )}
                        {(current.ticket.status === 'closed') && (
                          <span className="ticket-details red-text text-darken-2">{current.ticket.status}</span> 
                        )}
                        <br/>
                        {/* Priority Level */}
                        <span className="ticket-label">Priority Level <FontAwesomeIcon icon="chevron-right"/> </span>
                        {(current.ticket.priority === 'low') && (
                          <span className="priority-badge ticket-details grey-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        {(current.ticket.priority === 'normal') && (
                          <span className="priority-badge ticket-details green-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        {(current.ticket.priority === 'high') && (
                          <span className="priority-badge ticket-details red-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        <br/>
                        {/* Alert Level */}
                        <span className="ticket-label">Alert Level <FontAwesomeIcon icon="chevron-right"/> </span>{' '}
                        {(current.ticket.priority === 'low') && (
                          <span className="priority-badge ticket-details grey-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        {(current.ticket.priority === 'normal') && (
                          <span className="priority-badge ticket-details green-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        {(current.ticket.priority === 'high') && (
                          <span className="priority-badge ticket-details red-text text-darken-2">{current.ticket.priority}</span>
                        )}
                        <br/>
                        {/* Assigned To */}
                        <span className="ticket-label"> Assigned to <FontAwesomeIcon icon="chevron-right"/> </span>{' '}
                        {current.ticket.assignedTo._id !== user._id ? (
                          <Fragment>
                            <span className="ticket-details">
                              {current.ticket.assignedTo.to !== 'Unassigned' ? (
                                <Fragment>
                                  {current.ticket.assignedTo.firstName} {current.ticket.assignedTo.lastName}
                                </Fragment>
                              ) : (
                                <Fragment>
                                  {current.ticket.assignedTo.to}
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
                      {current.ticket.assignedTo.to === 'Unassigned' && user.userType === 'technician' && (
                        <Fragment>
                          <div className="divider"></div>
                          <div className="center ticket-actions-header">Actions</div>
                          <div className="ticket-actions-container row">
                            <div className="col s6 m6 center">
                              <a href="#!" onClick={onUpdate}>
                                <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
                                <span className="ticket-actions-label grey-text text-darken-2">update</span>
                              </a>
                            </div>
                          </div>
                        </Fragment>
                      )}  
                      {/* Show Actions for Ticket owner && Assigned Technician */}
                      {(current.ticket.issuedBy._id === user._id || current.ticket.assignedTo._id === user._id) && (
                        <Fragment>
                          <div className="divider"></div>
                          <div className="center ticket-actions-header">Actions</div>
                          <div className="ticket-actions-container row">
                            <div className="col s6 m6 center">
                              <a href="#!" onClick={onUpdate}>
                                <FontAwesomeIcon icon="edit" className="green-text text-darken-2" />
                                <span className="ticket-actions-label grey-text text-darken-2">update</span>
                              </a>
                            </div>
                            {/* Show delete action for ticket owner only */}
                            {current.ticket.issuedBy._id === user._id && (
                              <div className="col s6 m6 center">
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
                  {/* Comments Section */}
                  <div className="divider"></div>
                <div className="row">   
                  <div>
                    <p className="center section-label"> 
                      <FontAwesomeIcon icon="comments" />
                      {' '}
                      Comments
                    </p>
                    {current ? ( 
                      <div className="collection card-panel comment-container">
                        <Comments ticket_id={current.ticket._id} current_user={user._id}/>
                      </div>
                      ) : (
                      <PreLoader />
                    )}
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {!current && !ticket_exists && !current_ticket ? (
            <Redirect to={previousUrl} />
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
  current: PropTypes.object,
  ticket_exists: PropTypes.bool,
  comments: PropTypes.array,
  previousUrl: PropTypes.string,
  loading: PropTypes.bool,
  getTicket: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setTicketExists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  current: state.ticket.current,
  ticket_exists: state.ticket.ticket_exists,
  previousUrl: state.auth.previousUrl,
  loading: state.ticket.ticketLoading,
  comments: state.comment.comments
});

export default connect(mapStateToProps, { getTicket, getComments, setCurrent, clearCurrent, setTicketExists })(Ticket);