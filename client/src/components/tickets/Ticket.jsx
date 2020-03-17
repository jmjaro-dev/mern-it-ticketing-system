import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getTicket, setCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import PreLoader from '../layout/PreLoader';
// import M from 'materialize-css/dist/js/materialize.min.js';

const Ticket = ({ match, user, ticket, loading, getTicket, setCurrent }) => {
  useEffect(() => {
    if(user) {
      getTicket(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    
    <Fragment>
      {ticket && !loading ? (
        <div id="ticketContainer">
          {/* Navigation & actions*/}
          <div className="row card-panel" >
            <div className="col s12 m9 l10">
              <Link to="/" className="grey-text text-darken-2">
                <i className="fas fa-chevron-left"></i><span className="btn-label"> Back to Tickets</span>
              </Link>
            </div>
            <div className="col s12 m3 l2 center">
              <a href="#!">
                <i className="far fa-trash-alt red-text text-darken-2"></i>
                <span className="btn-label grey-text text-darken-2"> Delete Ticket</span>
              </a>   
            </div>
          </div>

          {/* Ticket Details */}
          <div className="row">
            {/* Left Panel */}
            <div className="row">
              {/* Ticket Info */}
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
                  <Moment format="MM-DD-YYYY " className="ticket-details">
                  {ticket.createdAt} 
                  </Moment>
                  <span className="ticket-details"> at </span>
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
                <div className="divider"></div>
                {/* Comments Section */}
                <p className="center ticket-label"> 
                    Comments
                </p>   
                <div className="card-panel">
                  
                </div>
              </div>
              
              {/* Right Panel */}
              <div className="col s3 card-panel" id="ticket-right-panel">
                <div className="center"><b>Ticket Details</b></div>
                <p>
                  <span className="ticket-label">Last Update <i className="fas fa-chevron-right"></i> </span>
                  <Moment format="MM/DD/YY " className="ticket-details">
                  {ticket.updatedAt} 
                  </Moment>
                  <span className="ticket-details"> at </span>
                  <Moment format="h:mm A" className="ticket-details">
                  {ticket.updatedAt} 
                  </Moment>
                  <br/>
                  <span className="ticket-label">Status <i className="fas fa-chevron-right"></i> </span> <span className="ticket-details">{ticket.status}</span> <br/>
                  <span className="ticket-label">Priority <i className="fas fa-chevron-right"></i> </span>
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
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.auth.user,
  ticket: state.ticket.current,
  loading: state.ticket.loading
});

export default connect(mapStateToProps, { getTicket, setCurrent })(Ticket);