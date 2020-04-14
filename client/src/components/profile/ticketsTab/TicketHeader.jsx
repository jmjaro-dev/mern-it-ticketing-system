import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const TicketHeader = ({ sorting, label, id, data_sort, onSetField }) => {
  const { isSorted, field, order} = sorting;

  return (
    <th className="center" key={id}> 
      <a href="#!" id={id} data_sort={data_sort} onClick={onSetField}>
        {label} {' '}
      </a>
      {!isSorted && field === null ? (
        <FontAwesomeIcon icon="sort"/>
      ) : (
        <Fragment>
          {isSorted && order === 'desc' ? (
            <FontAwesomeIcon icon="sort-up" />
          ) : (
            <FontAwesomeIcon icon="sort-down" />
          )}
        </Fragment>
      )}
    </th>
  )
}

TicketHeader.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  data_sort: PropTypes.string,
  sorting: PropTypes.object.isRequired,
  onSetField: PropTypes.func
};

const mapStateToProps = state => ({
  sorting: state.ticket.sorting
});

export default connect(mapStateToProps, null)(TicketHeader);