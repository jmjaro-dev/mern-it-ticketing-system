import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Profile = ({ user: { firstName, lastName, email, userType } }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const [activeTab, setActiveTab] = useState('#account-info');

  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
  }

  const accountInfo = (
    <div id="account-info" className="col s12 collection with-header">
      <div className="collection-header center">
        <h5 style={styles.header} >Account Information</h5> 
      </div>
      <div className="collection-item">
        {/* First Name */}
        <span className="grey-text" style={styles.label}> First Name : </span>
        <span style={styles.name}> { firstName }  </span> <br/>
        {/* Last Name */}
        <span className="grey-text" style={styles.label}> Last Name : </span>
        <span style={styles.name}> { lastName }  </span> <br/>
        {/* Email */}
        <span className="grey-text" style={styles.label}> Email : </span> 
        <span className="blue-text" style={styles.email}> { email } </span> <br/> 
        {/* User Type */}
        <span className="grey-text" style={styles.label}> User Type : </span>
        {userType !== 'employee' ? (
          <span className="indigo-text text-darken-2" style={styles.userType}> { userType } </span>
        ) : (
          <span className="cyan-text text-darken-1" style={styles.userType}> { userType } </span>
        )}    
      </div>
      {/* Update Button */}
      <div className="collection-item center">
        <a className="btn-small blue darken-2" style={styles.btn} href="#account-settings" onClick={setActive}>Update Info</a>
      </div>
    </div>
  );

  const accountSettings = (
    <div id="account-settings" className="col s12 collection with-header">
      <div className="collection-header center">
        <h5 style={styles.header} >Account Settings</h5> 
      </div>
      <div className="collection-item">
        {/* Change Name */}
        <span style={styles.subHeader}> Change Name </span>
        <br/>
        <div className="row">
          <form>
            <div className="form-group col s12 m5 l3">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" defaultValue={firstName} required/>
            </div>
            <div className="form-group col s12 m5 l3">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" defaultValue={lastName} required/>
            </div>
            <div className="col s12 m2 l2">
              <br/>
              <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Update"/>
            </div>
          </form>
        </div>
      </div>
      <div className="collection-item">
        {/* Change Password */}
        <span style={styles.subHeader}> Change Password </span>
        <div className="row">
          <form>
            <div className="form-group col s12 m3">
              <label htmlFor="currentPass">Current Password</label>
              <input type="password" name="currentPass" required/>
            </div>
            <div className="form-group col s12 m3">
              <label htmlFor="newPass">New Password</label>
              <input type="password" name="newPass" required/>
            </div>
            <div className="form-group col s12 m3">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input type="password" name="confirmPass" required/>
            </div>
            <div className="col s12 m2">
              <br/>
              <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Confirm"/>
            </div>
          </form>
        </div>
      </div>

      <div className="collection-item">
        {/* Change Email */}
        <span style={styles.subHeader}> Change Email</span> 
        <div className="row">
          <form>
            <div className="form-group col s12 m5">
              <label htmlFor="email">Current Email</label>
              <input type="email" name="email" defaultValue={email} required/>
            </div>
            <div className="form-group col s12 m5">
              <label htmlFor="newEmail">New Email</label>
              <input type="email" name="newEmail" required/>
            </div>
            <div className="col s12 m2">
              <br/>
              <input type="submit" className="btn-small blue darken-2" style={styles.btn} value="Confirm"/>
            </div>
          </form>
        </div>
      </div>

      <div className="collection-item center">
        {/* Delete Account */}
        <span className="btn-small red darken-2" style={styles.btn}>Delete Account</span>
      </div>
    </div>
  )

  return (
    <div className="row card-panel">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab col"><a className="active" href="#account-info" onClick={setActive} >Account Info</a></li>
          <li className="tab col"><a href="#account-settings" onClick={setActive} >Account Settings</a></li>
        </ul>
        {activeTab !== '#account-info' ? accountSettings : accountInfo }
      </div>      
    </div>
  )
}

const styles = {
  header: {
    fontSize: '1.5em'
  },
  subHeader: {
    fontSize: '1em',
    fontWeight: 'bold'
  },
  label : {
    fontSize: '0.82em'
  },
  name : {
    fontSize: '0.95em',
  },
  email : {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  userType: {
    fontSize: '0.95em',
    fontWeight: '500'
  },
  btn: {
    textTransform: 'capitalize'
  }

}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);