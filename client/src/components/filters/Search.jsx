import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterTickets, clearFilter } from '../../actions/ticketActions';
import PropTypes from 'prop-types';

const Search = ({  filterTickets, clearFilter }) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    filterTickets(text);   
    if(e.target.value === '') clearFilter();
  }
  
  return (
    <Fragment>
      <div className="col s12 m6 l4 valign-wrapper">
        <div className="col s1">
          <FontAwesomeIcon icon="search" className="blue-text" />  
        </div>
        <div className="col s11">
          <input name="text" type="text" placeholder="Search a Ticket..." onChange={onChange} onKeyUp={onChange} value={text} style={{ maxWidth: '300px' }} />
        </div>
      </div>
    </Fragment>
  )
}

Search.propTypes = {
  filterTickets: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
}

export default connect(null, { filterTickets, clearFilter })(Search);
