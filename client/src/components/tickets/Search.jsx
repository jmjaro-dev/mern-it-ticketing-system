import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterTickets, clearFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Search = ({ filtered, filterTickets, clearFilter }) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    filterTickets(text);
    
    if(e.target.value === '') clearFilter();
  }
  
  const onCreate = async e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
    instance.open();
  }

  return (
    <div className="row card" id="sub-menu">
      <div className="col s7">
        <div className="ticket-details">
          
        </div>
      </div>
      <div className="col s2">
        <a href="#create-ticket-modal" className="nav-links btn-small right green" onClick={onCreate}>
          + New ticket
        </a>
      </div>
      <div className="col s3 valign-wrapper">
        <i className="prefix fas fa-search blue-text"></i>
        <input className="col s10" name="text" type="text" placeholder="Search a Ticket..." onChange={onChange} value={text}/>
      </div>
    </div>
  )
}

Search.propTypes = {
  filtered: PropTypes.array
}

const mapStateToProps = state => ({
  filtered: state.ticket.filtered
});

export default connect(mapStateToProps, { filterTickets, clearFilter })(Search);