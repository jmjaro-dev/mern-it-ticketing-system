import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { updateTicket, setFilter, clearCurrent } from '../../actions/ticketActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateTicketModal = ({ tickets, current, active_filter, ticket_exists, user, techs, updateTicket, setAlert, setFilter, clearCurrent }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    assignedTo: ''
  });

  useEffect(() => {
    if(current !== null) {
      setTicket({
        title: current.title,
        description: current.description,
        priority: current.priority,
        status: current.status,
        assignedTo: current.assignedTo
      })
    }
  }, [current]);
  
  const { title, description, priority, status, assignedTo } = ticket;

  const onChange = e => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const closeModal = () => {
    let instance = M.Modal.getInstance(document.getElementById("update-ticket-modal"));
    instance.close();
  }

  const onSetFilter = filter => {
    let arr = [];
    // Set filter depending on 'filter' value
    switch(filter) {
      case "All Tickets":
        setFilter(filter, tickets);
        break;
      case "My Tickets": 
        arr = tickets.filter(ticket => {
          return user._id === ticket.issuedBy._id;
        })
        setFilter(filter, arr);
        break;
      case "Assigned To Me":
        arr = tickets.filter(ticket => {
          return user._id === ticket.assignedTo._id;
        })
        setFilter(filter, arr);
        break;
      case "Unassigned":
        arr = tickets.filter(ticket => {
          return ticket.assignedTo.to === 'Unassigned';
        })
        setFilter(filter, arr);
        break;
      case "Open":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        console.log(filter, arr);
        break;
      case "Pending":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        console.log(filter, arr);
        break;
      case "Closed":
        arr = tickets.filter(ticket => {
          return ticket.status === filter.toLowerCase();
        })
        setFilter(filter, arr);
        break;
      default:
        setFilter(filter, tickets);
    }
  }

  const onCancel = e => {
    e.preventDefault();
    setTicket({
      title: '',
      description: '',
      priority: '',
      status: '',
      assignedTo: ''
    });
    if(!ticket_exists) {
      clearCurrent();
    }
    closeModal();
  }

  const onSubmit = () => {
    onSetFilter(active_filter);
    if(title !== '' || description !== '' || priority !== '' || status !== '' || assignedTo !== '') {
      let assignedTO;
      
      if(assignedTo !== 'Unassigned') {
        assignedTO = techs.find(tech => assignedTo === tech._id);
      } else {
        assignedTO = 'Unassigned'
      }
      
      const updatedTicket = {
        _id: current._id,
        title,
        description,
        priority,
        status,
        assignedTo: assignedTO,
        userId: user._id
      }
  
      updateTicket(updatedTicket);

      setTicket({
        title: '',
        description: '',
        priority: '',
        status: '',
        assignedTo: ''
      });

      closeModal();      
      clearCurrent();
      setAlert('Ticket updated successfully!', 'success');
      onSetFilter(active_filter);     
    }
  }

  return (
    <Fragment>
      <div id="update-ticket-modal" className="modal" style={styles.modal}>
        {user && current !== null &&  (
          <Fragment>
            <div className="modal-content">
              {/* Header */}
              <div className="row">
                <div className="col s12">
                  <p className="center" style={styles.ticket_header}>
                    <FontAwesomeIcon icon="edit" size="lg" className="blue-text text-darken-2"/> {' '}
                    Update Ticket
                  </p>    
                </div>  
              </div>
              {/* Form STARTS */}
              <form onSubmit={onSubmit} styles={styles.modal}>
                {/* Title */}
                <div className="row">
                  <div className="form-group col s12">
                    <label htmlFor="title">Title</label>
                    {user._id !== current.issuedBy._id ? (
                      <input type="text" name="title" defaultValue={current.title} onChange={onChange} disabled/>
                    ): (
                      <input type="text" name="title" defaultValue={current.title} onChange={onChange} required/>
                    )}
                    
                  </div>
                </div>
                {/* Description */}
                <div className="row">
                  <div className="form-group col s12">
                    <label htmlFor="description">Description</label>
                    {user._id !== current.issuedBy._id ? (
                      <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} disabled></textarea>
                    ) : (
                      <textarea name="description" className="materialize-textarea" placeholder="Write a description here..." defaultValue={current.description} onChange={onChange} required></textarea>
                    )}
                  </div>
                </div>
                {/* Priority Level & Status */}
                <div className="row">
                  {/* Priority Level */}
                  <div className="form-group col s12 m6">
                    <label>Priority Level</label>
                    {user._id !== current.issuedBy._id ? (
                      <select name="priority" className="browser-default" defaultValue={current.priority}  onChange={onChange} disabled>
                        <option value="" disabled>- Priority Level -</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <select name="priority" className="browser-default" defaultValue={current.priority}  onChange={onChange} required>
                        <option value="" disabled>- Priority Level -</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    )}
                  </div>
                  {/* Status */}
                  <div className="form-group col s12 m6">
                    <label>Status</label>
                    {user._id !== current.issuedBy._id && user.userType !== 'technician' ? (
                      <select name="status" className="browser-default" defaultValue={current.status}  onChange={onChange} disabled>
                        <option value="" disabled>- Status -</option>
                        <option value="open">open</option>
                        <option value="pending">pending</option>
                        <option value="closed">closed</option>
                      </select>
                    ) : (
                      <select name="status" className="browser-default" defaultValue={current.status}  onChange={onChange} required>
                        <option value="" disabled>- Status -</option>
                        <option value="open">open</option>
                        <option value="pending">pending</option>
                        <option value="closed">closed</option>
                      </select>
                    )}
                  </div>
                </div>
                {/* Assigned */}
                <div className="row">
                  {/* If user = employee and owns the ticket : show Assign field*/}
                  {user && user.userType === 'employee' && user._id === current.issuedBy._id && (
                    <div className="form-group col s12">
                      <label>Assign To</label>
                      <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                        <option value="" disabled>- Assign Ticket To -</option>
                        <option value="Unassigned">- Unassigned -</option>
                        {techs && techs.map(tech => (
                          <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* If Ticket = Unassigned & user = technician : show Assign field*/}
                  {user && user.userType === 'technician' && current.assignedTo.to === 'Unassigned' && (
                    <div className="form-group col s12">
                      <label>Assign To</label>
                      <select name="assignedTo" className="browser-default" value={assignedTo._id} onChange={onChange} required>
                        <option value="" disabled>- Assign Ticket To -</option>
                        <option value="Unassigned">- Unassigned -</option>
                        {techs && techs.map(tech => (
                          <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {/* Form ENDS */}
              </form>
            </div>

            <div className="modal-footer">
              <button onClick={onCancel} className="btn-small white black-text">Cancel</button>
              {' '}
              {current !== null && title !== '' && description !== '' && priority !== '' && priority !== '' && assignedTo !== '' ? (
                <Fragment>
                  {current !== null && (title !== current.title || description !== current.description || priority !== current.priority || status !== current.status || assignedTo !== current.assignedTo) ? (
                    <button onClick={onSubmit} className="waves-effect btn-small blue darken-2">Update</button>
                  ) : (
                    <button className="btn-small" disabled>Update</button>
                  )}
                  
                </Fragment>
              ) : (
                <button className="btn-small" disabled>Update</button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

const styles = {
  modal : {
    padding: '0 0.5em 0 0.5em',
    width: '500px',
    borderRadius: '0.5em'
  },
  ticket_header: {
    fontSize: "1.5em",
    fontWeight: "bold"
  }
}

UpdateTicketModal.propTypes = {
  tickets: PropTypes.array,
  current: PropTypes.object,
  active_filter: PropTypes.string,
  ticket_exists: PropTypes.bool,
  user: PropTypes.object,
  techs: PropTypes.array,
  updateTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.ticket.mapped,
  current: state.ticket.current,
  active_filter: state.ticket.active_filter,
  ticket_exists: state.ticket.ticket_exists,
  user: state.auth.user,
  techs: state.user.techs
});

export default connect(mapStateToProps, { updateTicket, setAlert, setFilter, clearCurrent })(UpdateTicketModal);