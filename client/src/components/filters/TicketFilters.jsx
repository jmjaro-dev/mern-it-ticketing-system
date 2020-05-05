import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Filters from './Filters';
import PropTypes from 'prop-types';

const TicketFilters = ({ tickets, filtered, loading }) => {

  return (
    <Fragment>
      {tickets && !loading && (
        <div className="row card-panel">
          <Fragment>
            <Filters tickets={tickets} filtered={filtered}/>
          </Fragment>
        </div>
      )}
    </Fragment>
  )
}

TicketFilters.propTypes = {
  tickets: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  filtered: state.ticket.filtered,
  loading: state.ticket.ticketLoading
});

export default connect(mapStateToProps, null)(TicketFilters);