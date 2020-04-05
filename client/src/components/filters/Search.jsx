import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterTickets, clearFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Search = ({ userType, filterTickets, clearFilter }) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    filterTickets(text);   
    if(e.target.value === '') clearFilter();
  }
  
  const onCreate = e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
    instance.open();
  }

  return (
    <Fragment>
      <div className="col s2 valign-wrapper" id="createBtnContainer">
        {userType !== 'employee' ? (
          <Fragment>
            {' '}
          </Fragment>
        ) : (
          <a href="#create-ticket-modal" className="nav-links btn-small right blue darken-1" onClick={onCreate}>
            + New ticket
          </a>
        )}
      </div>

      <div className="col s3 valign-wrapper">
        <div className="col s1">
          <FontAwesomeIcon icon="search" className="blue-text" />  
        </div>
        <div className="col s11">
          <input name="text" type="text" placeholder="Search a Ticket..." onChange={onChange} onKeyUp={onChange} value={text}/>
        </div>
      </div>
    </Fragment>
  )
}

Search.propTypes = {
  userType: PropTypes.string.isRequired,
  filterTickets: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userType: state.auth.user.userType,
});

export default connect(mapStateToProps, { filterTickets, clearFilter })(Search);
