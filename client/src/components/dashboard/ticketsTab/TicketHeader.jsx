import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const TicketHeader = ({ sorting, label, id, data_sort, onSetField }) => {
  const { isSorted, field, order} = sorting;

  return (
    <Fragment>
      {label !== 'Actions' ? (
        <Fragment>
          {(label === '#' || label === 'Date Issued') && (
          <th className="center" key={id}> 
            <a href="#!" id={id} data_sort={data_sort} onClick={onSetField}>
              {label} {' '}
            </a>
            {!isSorted && field === null ? (
              <FontAwesomeIcon icon="sort"/>
            ) : (
              <Fragment>
                {isSorted && order === 'desc' ? (
                  <FontAwesomeIcon icon="sort-numeric-up" />
                ) : (
                  <FontAwesomeIcon icon="sort-numeric-down" />
                )}
              </Fragment>
            )}
          </th>
        )} 
        
        {(label === 'Alert' || label === 'Status' || label === 'Priority') && (
          <th className="center" key={id}> 
            <a href="#!" id={id} data_sort={data_sort} onClick={onSetField}>
              {label} {' '}
            </a>
            {!isSorted && field === null ? (
              <FontAwesomeIcon icon="sort"/>
            ) : (
              <Fragment>
                {isSorted && order === 'desc' ? (
                  <FontAwesomeIcon icon="sort-amount-up" />
                ) : (
                  <FontAwesomeIcon icon="sort-amount-down" />
                )}
              </Fragment>
            )}
          </th>
        )}

        {(label === 'Subject' || label === 'Assigned To' || label === 'Issued By') && (
          <th className="center" key={id}> 
            <a href="#!" id={id} data_sort={data_sort} onClick={onSetField}>
              {label} {' '}
            </a>
            {!isSorted && field === null ? (
              <FontAwesomeIcon icon="sort"/>
            ) : (
              <Fragment>
                {isSorted && order === 'desc' ? (
                  <FontAwesomeIcon icon="sort-alpha-up" />
                ) : (
                  <FontAwesomeIcon icon="sort-alpha-down" />
                )}
              </Fragment>
            )}
          </th>
        )}
        </Fragment>
      ) : (
        <th className="center" key={id}> 
          {label}
        </th>
      )}   
    </Fragment>
  )
}

TicketHeader.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  data_sort: PropTypes.string,
  sorting: PropTypes.object.isRequired,
  onSetField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sorting: state.ticket.sorting
});

export default connect(mapStateToProps, null)(TicketHeader);