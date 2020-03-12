import React from 'react';
import { connect } from 'react-redux';
import TicketItem from './TicketItem';
import PreLoader from '../layout/PreLoader';

const Tickets = () => {
  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  loading: state.tickets.loading
});

export default connect(mapStateToProps, null)(Tickets);