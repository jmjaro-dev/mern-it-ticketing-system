import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updatePassword } from '../../actions/authActions';
import { logout } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import { resetUserState } from '../../actions/userActions';
import { resetTicketState } from '../../actions/ticketActions';
import { resetCommentState } from '../../actions/commentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SecuritySettings = ({ user, loading, passError, passwordChangeStatus, updatePassword, resetUserState, resetTicketState, resetCommentState, logout, setAlert }) => {
  const [isVisible, setVisible] = useState(false);
  const [password, setPassword] = useState({
    current: '',
    newPassword: '',
    confirmPass: ''
  });

  useEffect(() => {
    if(!loading && passwordChangeStatus === 'failed' && passError !== null) {
      setAlert(passError, 'danger');
      setPassword({
        ...password,
        newPassword: '',
        confirmPass: ''
      });
    }
    if(!loading && passwordChangeStatus === 'success' && !passError) {
      setAlert('Password changed successfully! You will be automatically logged out in 5 seconds.', 'success');
      setTimeout(() => {
        resetUserState();
        resetTicketState();
        resetCommentState();
        logout();
      }, 5000);

      setPassword({
        current: '',
        newPassword: '',
        confirmPass: ''
      });
    }
    // eslint-disable-next-line
  }, [loading, passError]); 

  const { current, newPassword, confirmPass } = password;

  const onChange = e => {
    setPassword({ ...password, [e.target.name]: e.target.value});
  }
  
  const onCancelChange = () => {
    setPassword({
      current: '',
      newPassword: '',
      confirmPass: ''
    });
    setVisible(false);
  }

  const onChangePass = () => {
    setVisible(true);
  }
  
  const onChangePassword = e => {
    e.preventDefault();

    if(current !== newPassword) {
      const passwords = { 
        currentPassword: current, 
        newPassword 
      };

      updatePassword(user._id, passwords);
    }
  }

  const passwordForm = (
    <div>
      <form onSubmit={onChangePassword}>
        <div className="row">
          <div className="form-group col s12" style={styles.passField}>
            <label htmlFor="current">Current Password</label>
            <input type="password" name="current" onChange={onChange} defaultValue={current} required/>
          </div>
        </div>
        <div className="row">
          <div className="form-group col s12" style={styles.passField}>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" name="newPassword" onChange={onChange} value={newPassword}  required minLength="6"/>
          </div>  
        </div>
        <div className="row">
          <div className="form-group col s12" style={styles.passField}>
            <label htmlFor="confirmPass">Confirm Password</label>
            <input type="password" name="confirmPass" onChange={onChange} value={confirmPass} required minLength="6"/>
          </div>  
        </div>
        <div>
          <p>
          <span className="blue-text darken-2" style={styles.warning}>
            <FontAwesomeIcon icon='exclamation-circle' style={styles.icon}/>
            Tip
          </span> 
          <span className="grey-text text-darken-1" style={styles.helper}>: Use a combination of atleast 1 <span style={styles.emphasize}>Upper case</span> and <span style={styles.emphasize}>Special character</span> for a more secured password. </span>
          </p>
        </div>
        <div className="row">
          <div className="col s12">
            <span className="btn-small white black-text" onClick={onCancelChange}>Cancel</span> {' '}
            {(current !== '' && newPassword !== '' && confirmPass !== '' ) && (newPassword === confirmPass && newPassword !== current) ? 
            <input type="submit" className="btn-small blue darken-2" value="Confirm"/>  
            :
            <button className="btn-small" disabled>Confirm</button>
          }
          </div>
        </div>
      </form>
    </div>
  )

  return (
    <div id="account-settings" className="col s12 collection with-header">
    <div className="collection-header">
      <h5 style={styles.header} >Change Password</h5> 
    </div>
    <div className="collection-item">
      {/* Change Password */}
      {user && (
        <Fragment>
          {!isVisible ? (
            <div>
              <span className="grey-text text-darken-1" style={styles.helper}>Click the button to <span className="green-text text-darken-1" style={styles.emphasize}>change</span> your password.</span>
              <br/>
              <span className="btn-small green" style={styles.changeBtn} onClick={onChangePass}>Change Password</span>
              <br/>
              {loading && (
                <FontAwesomeIcon icon="spinner" size="3x" className="blue-text" spin/>
              )}          
            </div>
            ) :
              passwordForm
          }
        </Fragment>
      )}
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
  password: {
    fontWeight: '500'
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
  showBtn: {
    fontSize: '0.8em'
  },
  changeBtn: {
    marginTop: '1em',
    marginBottom: '1em',
    fontSize: '0.8em'
  }
}

SecuritySettings.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  passError: PropTypes.string,
  passwordChangeStatus: PropTypes.string,
  updatePassword: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  resetUserState: PropTypes.func.isRequired,
  resetTicketState: PropTypes.func.isRequired,
  resetCommentState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  alert: state.alert,
  passwordChangeStatus: state.auth.passwordChangeStatus,
  loading: state.auth.authLoading,
  passError: state.auth.passError
})

export default connect(mapStateToProps, { updatePassword, resetUserState, resetTicketState, resetCommentState, logout, setAlert })(SecuritySettings);