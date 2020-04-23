import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { updateUserName } from '../../../actions/authActions';
import { updateNameOnTickets } from '../../../actions/ticketActions';
import { updateNameOnComments } from '../../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateProfileModal = ({ user, updateUserName, updateNameOnTickets, updateNameOnComments, setAlert }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: ''
  });

  useEffect(() => {
    if(user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      })
    }
  }, [user]);
  
  const { firstName, lastName, email, userType } = profile;

  const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const closeModal = () => {
    let instance = M.Modal.getInstance(document.getElementById("update-profile-modal"));
    instance.close();
  }

  const onCancel = e => {
    e.preventDefault();
    setProfile({
      firstName: '',
      lastName: '',
      email: '',
      userType: ''
    });
    closeModal();
  }

  const onSubmit = () => {
    if(firstName !== '' || lastName !== '' || email !== '') {
      
      const updatedUser = {
        id: user._id,
        firstName : firstName,
        lastName: lastName,
        userType
      }

      updateUserName(updatedUser);
      updateNameOnTickets(updatedUser);
      updateNameOnComments(updatedUser);

      setProfile({
        firstName: '',
        lastName: '',
        email: '',
        userType: ''
      });

      closeModal();      
      setAlert('Profile updated successfully!', 'success');
    }
  }

  return (
    <Fragment>
      <div id="update-profile-modal" className="modal" style={styles.modal}>
        {user  &&  (
          <Fragment>
            <div className="modal-content">
              {/* Header */}
              <div className="row">
                <div className="col s12">
                  <p className="center" style={styles.ticket_header}>
                    <FontAwesomeIcon icon="edit" size="lg" className="blue-text text-darken-2"/> {' '}
                    Update Profile Info
                  </p>    
                </div>  
              </div>
              {/* Form STARTS */}
              <form onSubmit={onSubmit} styles={styles.modal}>
                <div className="row">
                  {/* First Name */}
                  <div className="form-group col s12 m6">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" defaultValue={user.firstName} onChange={onChange} required/>
                  </div>
                  {/* Last Name */}
                  <div className="form-group col s12 m6">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" defaultValue={user.lastName} onChange={onChange} required/>
                  </div>
                </div>
                {/* Form ENDS */}
              </form>
            </div>

            <div className="modal-footer">
              <button onClick={onCancel} className="btn-small white black-text">Cancel</button>
              {' '}
              {user !== null && firstName !== '' && lastName !== '' && email !== '' ? (
                <Fragment>
                  {user !== null && (firstName !== user.firstName || lastName !== user.lastName || email !== user.email) ? (
                    <button onClick={onSubmit} className="waves-effect btn-small blue darken-2">Update</button>
                  ) : (
                    <button className="btn-small" disabled>Update</button>
                  )}
                </Fragment>
              ) : (
                <button className="btn-small" disabled>Update</button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

const styles = {
  modal : {
    padding: '0 0.5em 0 0.5em',
    width: '500px',
    borderRadius: '0.5em'
  },
  ticket_header: {
    fontSize: "1.5em",
    fontWeight: "bold"
  }
}

UpdateProfileModal.propTypes = {
  user: PropTypes.object,
  updateUserName: PropTypes.func.isRequired,
  updateNameOnTickets: PropTypes.func.isRequired,
  updateNameOnComments: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { updateUserName, updateNameOnTickets, updateNameOnComments, setAlert })(UpdateProfileModal);