import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateEmail, deleteAccount, logout, resetStatus } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const AccountSettings = ({ user, emailUpdateStatus, accountDeleteStatus, accountError, emailError, loading, updateEmail, deleteAccount, logout, resetStatus, setAlert }) => {
  const [isVisible, setIsVisible] = useState({
    update: false,
    delete: false
  });
  const [email, setEmail] = useState({
    current: user.email,
    newEmail: ''
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(!loading && emailUpdateStatus === 'failed' && emailError !== null) {
      setAlert(emailError, 'danger');
    }

    if(!loading && emailUpdateStatus === 'success' && !emailError) {
      setAlert('Email update success.', 'success');
      setEmail({...email, newEmail: ''});
      setIsVisible({...isVisible, update: false});
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
  }, [loading]);

  const { current, newEmail } = email;

  const onChange = e => {
    if(e.target.name === 'current' || e.target.name === 'newEmail') {
      setEmail({...email, [e.target.name]: e.target.value});
    } else {
      setPassword(e.target.value);
    } 
  }
  
  const onCancelUpdate = () => {
    setIsVisible({...isVisible, update: false});
  }

  const onCancelDelete = () => {
    setIsVisible({...isVisible, delete: false});
  }

  const onUpdate = () => {
    setIsVisible({...isVisible, update: true});
  }

  const onDelete = () => {
    setIsVisible({...isVisible, delete: true});
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
          <span className="btn-small white black-text" onClick={onCancelUpdate}>Cancel</span> {' '}
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
    <div id="account-settings" className="col s12 collection with-header">
      <div className="collection-header">
        <h5 style={styles.header} >Account Email</h5> 
      </div>
      <div className="collection-item">
        {/* Account Email */}
        {!isVisible.update ? (
          <div>
            <span className="grey-text" style={styles.label}>Email:</span> 
            <span className="blue-text" style={styles.email}> { user.email } </span>    
            <a href="#!" className="green-text" onClick={onUpdate} style={styles.updateBtn}>
              [ update ] 
            </a>
          </div>
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
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
  },
  label: {
    fontSize: '0.82em'
  },
  email: {
    fontWeight: '500'
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
  deleteBtn: {
    marginTop: '1em',
  },
  updateBtn: {
    marginLeft: '1em',
    fontSize: '0.8em',
    fontWeight: '500'
  }
}

AccountSettings.propTypes = {
  user: PropTypes.object.isRequired,
  emailUpdateStatus: PropTypes.string,
  accountDeleteStatus: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  accountError: PropTypes.string,
  emailError: PropTypes.string, 
  updateEmail: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetStatus: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  emailUpdateStatus: state.auth.emailUpdateStatus,
  accountDeleteStatus: state.auth.accountDeleteStatus,
  loading: state.auth.loading,
  accountError: state.auth.accountError,
  emailError: state.auth.emailError
});

export default connect(mapStateToProps, { updateEmail, deleteAccount, logout, resetStatus, setAlert })(AccountSettings);