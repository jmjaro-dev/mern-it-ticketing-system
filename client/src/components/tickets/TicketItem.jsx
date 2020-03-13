import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteTicket, setCurrent, clearCurrent } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TicketItem = ({ ticket, deleteTicket, setCurrent, clearCurrent }) => {

  const { _id, priorityLevel, status, title, issuedBy, dateIssued } = ticket;
  
  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{priorityLevel}</td>
        <td>{status}</td>
        <td>{title}</td>
        <td>{issuedBy}</td>
        <td>
          <Moment format="MMMM do YYYY, h:mm:ss a">
            {dateIssued}
          </Moment>
        </td>
        <td>
          <a href="#!">
            <i className="material-icons">delete</i>
          </a>
          <a href="#!">
            <i className="material-icons">edit</i>
          </a>   
        </td>
      </tr>
    </Fragment>
  )
}

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired
};


export default connect(null, { deleteTicket, setCurrent, clearCurrent })(TicketItem);