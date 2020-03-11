import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-exclamation-circle" />  {alert.msg}
      </div>
    ))
  )
}

const mapPropsToState = state => ({
  alerts: state.alert
});

export default connect(mapPropsToState, null)(Alerts);