import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateUserName, updateEmail, deleteAccount, logout, resetStatus } from '../../actions/authActions';
import { getTickets, updateNameOnTickets } from '../../actions/ticketActions';
import { updateNameOnComments } from '../../actions/commentActions';
import { setAlert } from '../../actions/alertActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const AccountSettings = ({ user, tickets, getTickets, nameUpdateStatus, emailUpdateStatus, accountDeleteStatus, accountError, nameError, emailError, loading, updateUserName, updateNameOnTickets, updateNameOnComments, updateEmail, deleteAccount, logout, resetStatus, setAlert }) => {
  const [isVisible, setIsVisible] = useState({
    updateProfile: false,
    updateEmail: false,
    delete: false
  });
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName
  });
  const [email, setEmail] = useState({
    current: user.email,
    newEmail: ''
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(user && !tickets && !loading) {
      getTickets();
    }

    if(!loading && nameUpdateStatus === 'failed' && nameError !== null) {
      setAlert(nameError, 'danger');
    }

    if(!loading && nameUpdateStatus === 'success' && !nameError) {
      setAlert('Profile update success.', 'success');
      setProfile({ 
        firstName: user.firstName,
        lastName: user.lastName 
      });
      setIsVisible({...isVisible, updateProfile: false});
      resetStatus('name');
    }

    if(!loading && emailUpdateStatus === 'failed' && emailError !== null) {
      setAlert(emailError, 'danger');
    }

    if(!loading && emailUpdateStatus === 'success' && !emailError) {
      setAlert('Email update success.', 'success');
      setEmail({...email, newEmail: ''});
      setIsVisible({...isVisible, updateEmail: false});
      resetStatus('email');
    }

    if(!loading && accountDeleteStatus === 'failed' && accountError !== null) {
      setAlert(accountError, 'danger');
    }

    if(!loading && accountDeleteStatus === 'success' && !accountError) {
      setAlert('Account deleted successfully. You will be automatically logged out in 5 seconds', 'success');
      resetStatus('account');
      setTimeout(() => {
        logout()
      }, 5000);
    }
    // eslint-disable-next-line
  }, [user, loading]);

  const { current, newEmail } = email;
  const { firstName, lastName } = profile;

  const onChange = e => {
    if(e.target.name === 'firstName' || e.target.name === 'lastName') {
      setProfile({ ...profile, [e.target.name]: e.target.value })
    }
    if(e.target.name === 'current' || e.target.name === 'newEmail') {
      setEmail({ ...email, [e.target.name]: e.target.value });
    }
    if(e.target.name === 'password') {
      setPassword(e.target.value);
    } 
  }
  
  const onCancelUpdateProfile = () => {
    setIsVisible({...isVisible, updateProfile: false});
  }

  const onCancelUpdateEmail = () => {
    setIsVisible({...isVisible, updateEmail: false});
  }

  const onCancelDelete = () => {
    setIsVisible({...isVisible, delete: false});
  }

  const onUpdate_Profile = () => {
    setIsVisible({...isVisible, updateProfile: true});
  }

  const onUpdate_Email = () => {
    setIsVisible({...isVisible, updateEmail: true});
  }

  const onDelete = () => {
    setIsVisible({...isVisible, delete: true});
  }

  const onUpdateProfile = e => {
    e.preventDefault();

    const updatedUser = {
      id: user._id,
      firstName,
      lastName,
      userType: user.userType
    }

    if(user.firstName !== firstName || user.lastName !== lastName) {
      updateUserName(updatedUser);
      updateNameOnTickets(updatedUser);
      updateNameOnComments(updatedUser);
    }
  }

  const onUpdateEmail = e => {
    e.preventDefault();

    const updatedUser = { id: user._id, email: newEmail };

    if(current !== newEmail) {
      updateEmail(updatedUser);
    }
  }

  const onDeleteAccount = e => {
    e.preventDefault();
    if(password !== '') {
      deleteAccount(user._id, password)
    }
  }

  const updateProfileForm = (
    <div>
      <form onSubmit={onUpdateProfile}>
        <div className="row">
          <div className="form-group col s12" style={styles.nameField}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" defaultValue={user.firstName} onChange={onChange}/>
          </div>
          <div className="form-group col s12" style={styles.nameField}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" defaultValue={user.lastName} onChange={onChange} required/>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <span className="btn-small white black-text" onClick={onCancelUpdateProfile}>Cancel</span> {' '}
            {(firstName !== '' && lastName !== '') && (firstName !== user.firstName || lastName !== user.lastName) ? 
              <input type="submit" className="btn-small blue darken-2" value="Confirm"/>  
              :
              <button className="btn-small" disabled>Confirm</button>
            }
          </div>
        </div>
      </form>
    </div>
  )

  const updateEmailForm = (
    <div>
      <form onSubmit={onUpdateEmail}>
        <div className="row">
          <div className="form-group col s12" style={styles.emailField}>
            <label htmlFor="current">Current Email</label>
            <input type="email" name="current" defaultValue={user.email} disabled/>
          </div>
        </div>
        <div className="row">
          <div className="form-group col s12" style={styles.emailField}>
            <label htmlFor="newEmail">New Email</label>
            <input type="email" name="newEmail" onChange={onChange} required/>
          </div>
        </div>
        <div className="col s12">
          <span className="btn-small white black-text" onClick={onCancelUpdateEmail}>Cancel</span> {' '}
          {(current !== '' && newEmail !== '') && (current !== newEmail) ? 
            <input type="submit" className="btn-small blue darken-2" value="Confirm"/>  
            :
            <button className="btn-small" disabled>Confirm</button>
          }
        </div>
      </form>
      <br/>
    </div>
  )

  const deleteAccountForm = (
    <div>
      <h5 style={styles.header}>User Verification</h5>
      <p >Enter your password to <span className="green-text" style={styles.emphasize}>verify</span> if it's really you.</p>
      <form onSubmit={onDeleteAccount}>
        <div className="row">
          <div className="form-group col s12" style={styles.passField}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={onChange} required/>
          </div>  
        </div>
        <div>
          <p>
          <span className="orange-text darken-2" style={styles.warning}>
            <FontAwesomeIcon icon='exclamation-circle' style={styles.icon}/>
            Warning
          </span> 
          <span className="grey-text text-darken-1" style={styles.helper}>: You can't recover your account once deleted. Click 'confirm' to proceed. </span>
          </p>
        </div>
        <div className="col s12">
          <span className="btn-small white black-text" onClick={onCancelDelete}>Cancel</span> {' '}
          {password !== '' ? 
            <input type="submit" className="btn-small red darken-2" value="Confirm"/>
            :
            <button className="btn-small" disabled>Confirm</button>
          }
        </div>
      </form>
      <br/>
    </div>
  ) 
  
  return (
    <Fragment>
      {user && (
        <div id="account-settings" className="col s12 collection with-header">
          <div className="collection-header">
            <h5 style={styles.header} >Account Profile</h5> 
          </div>
          <div className="collection-item">
            {/* Account Profile */}
            {!isVisible.updateProfile ? (
              <Fragment>
                <div>  
                  {/* First Name */}
                  <span className="grey-text" style={styles.label}> First Name : </span>
                  <span style={styles.name}> { user.firstName }  </span> <br/>
                  {/* Last Name */}
                  <span className="grey-text" style={styles.label}> Last Name : </span>
                  <span style={styles.name}> { user.lastName }  </span> <br/>
                  {/* User Type */}
                  <span className="grey-text" style={styles.label}> User Type : </span>
                  {user.userType !== 'employee' ? (
                    <span className="indigo-text text-darken-2" style={styles.userType}> { user.userType } </span>
                  ) : (
                    <span className="cyan-text text-darken-1" style={styles.userType}> { user.userType } </span>
                  )}
                </div>
                
                <div>
                  {user &&  (
                    <a href="#!" className="btn-small blue darken-1" style={styles.updateProfileBtn} onClick={onUpdate_Profile}>
                      Update Profile
                    </a>
                  )}
                </div>
              </Fragment>
            ) : 
              updateProfileForm
            }
          </div>
          <div className="collection-header">
            <h5 style={styles.header} >Account Email</h5> 
          </div>
          <div className="collection-item">
            {/* Account Email */}
            {!isVisible.updateEmail ? (
              <Fragment>
                <div>
                  <span className="grey-text" style={styles.label}>Email:</span> 
                  <span className="blue-text" style={styles.email}> { user.email } </span>    
                </div>
                <div>
                  <a href="#!" className="btn-small green darken-1" onClick={onUpdate_Email} style={styles.updateEmailBtn}>
                    update email
                  </a>
                </div>
              </Fragment>
            ) : 
              updateEmailForm
            }
          </div>
          <div className="collection-header">
            <h5 style={styles.header} >Delete Account</h5> 
          </div>
          <div className="collection-item">
            {/* Delete Account */}
            {!isVisible.delete ? (
              <div>
                <span className="grey-text text-darken-1" style={styles.helper}>Click the button to <span className="red-text text-lighten-1" style={styles.emphasize}>delete</span> your account.</span>
                <br/>
                <span className="btn-small red darken-2" onClick={onDelete} style={styles.deleteBtn}>Delete Account</span>
              </div>
            ) : 
              deleteAccountForm
            }
          </div>
        </div>
      )}
    </Fragment>
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
  },
  label: {
    fontSize: '0.82em'
  },
  name: {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  userType: {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  email: {
    fontWeight: '500'
  },
  nameField: {
    maxWidth: '225px'
  },
  emailField: {
    maxWidth: '250px'
  },
  passField: {
    maxWidth: '220px'
  },
  helper: {
    fontSize: '0.8em'
  },
  warning: {
    fontSize: '0.82em',
    fontWeight: 'bold'
  },
  icon: {
    marginRight: '0.5em'
  },
  emphasize: {
    fontWeight: '500'
  },
  updateProfileBtn: {
    marginTop: '1.5em'
  },
  updateEmailBtn: {
    marginTop: '1.5em'
  },
  deleteBtn: {
    marginTop: '1em'
  }
}

AccountSettings.propTypes = {
  tickets: PropTypes.array,
  user: PropTypes.object.isRequired,
  nameUpdateStatus: PropTypes.string,
  emailUpdateStatus: PropTypes.string,
  accountDeleteStatus: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  accountError: PropTypes.string,
  nameError: PropTypes.string,
  emailError: PropTypes.string,
  getTickets: PropTypes.func.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateNameOnTickets: PropTypes.func.isRequired,
  updateNameOnComments: PropTypes.func.isRequired, 
  updateEmail: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetStatus: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickets: state.ticket.tickets,
  nameUpdateStatus: state.auth.nameUpdateStatus,
  emailUpdateStatus: state.auth.emailUpdateStatus,
  accountDeleteStatus: state.auth.accountDeleteStatus,
  loading: state.auth.authLoading,
  accountError: state.auth.accountError,
  emailError: state.auth.emailError,
  nameError: state.auth.nameError
});

export default connect(mapStateToProps, { getTickets, updateUserName, updateNameOnTickets, updateNameOnComments, updateEmail, deleteAccount, logout, resetStatus, setAlert })(AccountSettings);