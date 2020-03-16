import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Moment from 'react-moment';
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
        <div className="card grid-3">
        <div className="row">
          <Link to="/">Back</Link>
        </div>
        <h1>Ticket Item Component</h1>
        <p>{ticket._id}</p>
        <p>{ticket.title}</p>
        <p>{ticket.status}</p>
        <p>{ticket.priority}</p>
        <p>{ticket.issuedBy.firstName} {' '} {ticket.issuedBy.lastName} </p>
        <p>{ticket.createdAt}</p>
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