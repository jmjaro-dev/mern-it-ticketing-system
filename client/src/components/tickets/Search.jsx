import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Search = ({ tickets }) => {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  const onCreate = async e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
    instance.open();
  }

  // const onSubmit = e => {
  //   e.preventDefault();

  //   if(text === '') {
  //     alert('Please enter something');
  //   } else {
  //     setText('');
  //   }
  // }

  return (
    <div className="row card" id="sub-menu">
      <div className="col s7">
        <div className="ticket-details">
          {' '}
        </div>
      </div>
      <div className="col s2">
        <a href="#create-ticket-modal" className="nav-links btn-small right green" onClick={onCreate}>
          + New ticket
        </a>
      </div>
      <div className="col s3 valign-wrapper">
        <input className="col s10" type="text" name="text" placeholder="Search a Ticket..." value={text} onChange={onChange}/>
        <a href="#!" className="col s2">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </div>
  )
}

Search.propTypes = {
  tickets: PropTypes.array
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets
});

export default connect(mapStateToProps)(Search);