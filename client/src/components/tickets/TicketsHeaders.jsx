import React, { Fragment } from 'react';
import TicketHeader from './TicketHeader';
import PropTypes from 'prop-types';

const TicketHeaders = ({ onSetField }) => {
  const headers = [
    { 
      label: '#',
      id: 'sortById',
      data_sort: '_id'
    }, 
    { 
      label: 'Alert',
      id: 'sortByAlertLevel',
      data_sort: 'alertLevel'
    },
    { 
      label: 'Status',
      id: 'sortByStatus',
      data_sort: 'status'
    },
    { 
      label: 'Subject',
      id: 'sortByTitle',
      data_sort: 'title'
    },
    { 
      label: 'Issued By',
      id: 'sortByIssuedBy',
      data_sort: 'issuedBy'
    },
    { 
      label: 'Priority',
      id: 'sortByPriorityLevel',
      data_sort: 'priorityLevel'
    },
    { 
      label: 'Date Issued',
      id: 'sortByDateIssued',
      data_sort: 'dateIssued'
    },
    { 
      label: 'Assigned To',
      id: 'sortByAssignedTo',
      data_sort: 'assignedTo'
    },
    { 
      label: 'Actions'
    }
  ];
  
  return (
    <Fragment>
      <thead>
        <tr>
          {headers.map((header) => (
            <Fragment key={header.label}>
            {header.label !== 'Actions' ? (
              <TicketHeader key={header.label} label={header.label} id={header.id} data_sort={header.data_sort} onSetField={onSetField}/>
            ) : (
              <TicketHeader key={header.label} label={header.label}/>
            )}
            </Fragment>
          ))}
        </tr>
      </thead>
    </Fragment>
  )
}

TicketHeaders.propTypes = {
  onSetField: PropTypes.func.isRequired
};

export default TicketHeaders;