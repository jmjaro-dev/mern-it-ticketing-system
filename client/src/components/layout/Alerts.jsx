import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon="exclamation-circle" style={{ marginRight: "0.8em" }}/>
        {alert.msg}
      </div>
    ))
  )
}

const mapPropsToState = state => ({
  alerts: state.alert
});

export default connect(mapPropsToState, null)(Alerts);