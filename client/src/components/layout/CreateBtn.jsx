import React, { Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const CreateBtn = ({ user }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const onCreate = e => {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById("create-ticket-modal"));
    instance.open();
  }

  return (
    <Fragment>
      {user && user.userType === 'employee' && (
        <div className="fixed-action-btn">
          <span className="btn-floating btn-large waves-light blue darken-2">
            <FontAwesomeIcon icon="plus" />
          </span>
          <ul>
            <li>
              <a href="#create-ticket-modal" className="btn-floating green tooltipped" data-position="left" data-tooltip="Create Ticket" onClick={onCreate}>
              <FontAwesomeIcon icon="file-invoice" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  )
};

CreateBtn.propTypes = {
  user: PropTypes.object.isRequired
}

export default CreateBtn;
