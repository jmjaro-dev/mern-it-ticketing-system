import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Filters from './Filters';
import PropTypes from 'prop-types';

const TicketFilters = ({ tickets, loading }) => {

  return (
    <Fragment>
      {tickets && !loading && (
        <div className="row card-panel">
          <Fragment>
            <Filters tickets={tickets}/>
          </Fragment>
        </div>
      )}
    </Fragment>
  )
}

TicketFilters.propTypes = {
  tickets: PropTypes.array,
  loading: PropTypes.bool,
  owned: PropTypes.array,
  filtered: PropTypes.array
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  loading: state.ticket.loading,
  owned: state.ticket.owned,
  filtered: state.ticket.filtered
});

export default connect(mapStateToProps, null)(TicketFilters);