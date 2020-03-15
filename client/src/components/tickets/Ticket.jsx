import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteTicket } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
// import M from 'materialize-css/dist/js/materialize.min.js';

const Ticket = ({ ticket }) => {

  const { _id, priority, status, title, issuedBy, createdAt } = ticket;

  return (
    <Fragment>
        <div>
          <h1>Ticket Item Component</h1>
          <p>{_id}</p>
          <p>{title}</p>
          <p>{status}</p>
          <p>{priority}</p>
          <p>{issuedBy.firstName} {' '} {issuedBy.lastName} </p>
          <p>{createdAt}</p>
        </div>
    </Fragment>
  )
}

Ticket.propTypes = {
  ticket: PropTypes.object
};

const mapStateToProps = state => ({
  ticket: state.ticket.current 
});

export default connect(mapStateToProps, { deleteTicket })(Ticket);