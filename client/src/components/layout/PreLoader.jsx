import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => {
  const styles = {
    position: "absolute",
    top: "40%",
    left: "50%"
  }

  return (
    <Fragment>
      <div className="center" style={styles}>
        <FontAwesomeIcon icon="spinner" size="3x" className="blue-text" spin/>
      </div>
    </Fragment>
  )
}
