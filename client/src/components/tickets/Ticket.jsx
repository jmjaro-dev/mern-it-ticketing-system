import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getTicket, setCurrent } from '../../actions/ticketActions';
import { getComments } from '../../actions/commentActions';
import Comments from '../comments/Comments';
import AddComment from '../comments/AddComment';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';


const Ticket = ({ match, user, ticket, comments, loading, getTicket, getComments, setCurrent }) => {
  useEffect(() => {
    if(user) {
      getTicket(match.params.id);
      getComments(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  // const onTest = e => {
  //   e.preventDefault();
  //   console.log(history.location.pathname);
  // }

  const onUpdate = async e => {
    e.preventDefault();
    setCurrent(ticket);
    let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
    instance.open();
  }
  const onDelete = async e => {
    e.preventDefault();
    setCurrent(ticket);
    let instance = M.Modal.getInstance(document.getElementById("delete-ticket-modal"));
    instance.open();
  }

  return (
    <Fragment>
      {ticket && !loading ? (
        <div id="ticketContainer">
          {/* Navigation & actions*/}
          <div className="row ticket-links" >
            <div className="col s12">
              <Link to="/" className="grey-text text-darken-2">
                <i className="fas fa-chevron-left"></i><span className="btn-label"> Back to Tickets</span>
              </Link>
              {' '}
              {/* <a href="#!" onClick={onTest}>location</a> */}
            </div>
          </div>

          {/* Ticket Details */}
          <div className="row">
            {/* Left Panel */}
            <div className="row">
              {/* Ticket Info */}
              <p className="center section-label"> 
                  Ticket Information
              </p>  
              <div className="col s9" id="ticket-left-panel">
                {/* Ticket info Section */}
                <div className="card-panel">
                  {/* Ticket Title, Alert Level, IssuedBy */}
                  <p className="center">
                    <span className="ticket-label">[ ID ]</span> <span id="ticket-id" className="ticket-details black-text">{ticket._id} </span>
                  
                    <span id="ticket-title" className="blue-text text-darken-2">{ticket.title}</span>

                    {(ticket.priority === 'low') && (
                      <span className="alert-badge grey"></span>
                    )}
                    {(ticket.priority === 'normal') && (
                      <span className="alert-badge green"></span>
                    )}
                    {(ticket.priority === 'high') && (
                      <span className="alert-badge red"></span>
                    )}
                  </p>
                  <div className="col s6 right-align">
                    <span className="ticket-label">
                      [ Created By ] 
                    </span> <span className="ticket-details">{ticket.issuedBy.lastName} {', '} {ticket.issuedBy.firstName} </span>
                  </div>

                  <div className="col s6">
                  <span className="ticket-label">[ Date Created ]</span> {' '}
                  <Moment format="MM-DD-YYYY, " className="ticket-details">
                  {ticket.createdAt} 
                  </Moment>
                  <span className="ticket-details"> @ </span>
                  <Moment format="h:mm A" className="ticket-details">
                  {ticket.createdAt} 
                  </Moment>
                  </div>
                  
                  <br/><br/> 
                  
                  <div className="divider"></div>
                  {/* Ticket Description */}
                  <p>
                    <span className="ticket-label">
                      Description <i className="fas fa-chevron-right"></i> 
                    </span> <span className="ticket-desc">{ticket.description}</span>
                  </p>
                </div>
                {/* Comments Section */}
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
                {/* Add Comment Section */}
                <div className="divider"></div>
                <p className="center section-label"> 
                    Write a Comment
                </p>
                <div>
                  {comments && (
                    <AddComment user={user} ticket_id={ticket._id}/>
                  )}
                </div>  
              </div>
              
              {/* Right Panel */}
              <div className="col s3 card-panel" id="ticket-right-panel">
                <div className="center ticket-details">Ticket Details</div>
                <p>
                  <span className="ticket-label">Latest Update <i className="fas fa-chevron-right"></i> </span>
                  <Moment fromNow className="ticket-details">
                  {ticket.updatedAt} 
                  </Moment>
                  <br/>
                  <span className="ticket-label">Status <i className="fas fa-chevron-right"></i> </span> <span className="ticket-details">{ticket.status}</span> <br/>
                  <span className="ticket-label">Priority Level <i className="fas fa-chevron-right"></i> </span>
                  {(ticket.priority === 'low') && (
                    <span className="priority-badge ticket-details grey-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'normal') && (
                    <span className="priority-badge ticket-details green-text text-darken-2">{ticket.priority}</span>
                  )}
                  {(ticket.priority === 'high') && (
                    <span className="priority-badge ticket-details red-text text-darken-2">{ticket.priority}</span>
                  )}
                </p>  

                <div className="divider"></div>
                <div className="center ticket-actions-header">Ticket Actions</div>
                <div className="ticket-actions-container row">
                  {ticket.issuedBy._id === user._id && (
                    <Fragment>
                      <div className="col s12 m6 center">
                        <a href="#!" onClick={onDelete}>
                          <i className="far fa-trash-alt red-text text-darken-2"></i>
                          <span className="ticket-actions-label grey-text text-darken-2"> delete</span>
                        </a>
                      </div>
                      <div className="col s12 m6 center">
                        <a href="#!" onClick={onUpdate}>
                          <i className="far fa-edit green-text text-darken-2"></i>
                          <span className="ticket-actions-label grey-text text-darken-2">update</span>
                        </a>
                      </div>
                    </Fragment>
                  )}  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PreLoader/>
      )}
    </Fragment>
  )
}

Ticket.propTypes = {
  user: PropTypes.object.isRequired,
  ticket: PropTypes.object,
  comments: PropTypes.array,
  loading: PropTypes.bool,
  getTicket: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  ticket: state.ticket.current,
  loading: state.ticket.loading,
  comments: state.comment.comments
});

export default connect(mapStateToProps, { getTicket, getComments, setCurrent })(Ticket);