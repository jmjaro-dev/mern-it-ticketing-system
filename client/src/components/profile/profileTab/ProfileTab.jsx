import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ProfileTab = ({ user }) => {
  return (
    <div id="profile" className="col s12 collection with-header">
      <div className="collection-header">
        <h5 style={styles.header} >Profile</h5> 
      </div>
      <div className="collection-item avatar">
        <i className="circle grey lighten-2 z-depth-2">
          <FontAwesomeIcon icon="user" className={user.userType !== "employee" ? "indigo-text text-darken-2" : "cyan-text text-darken-1"} />
        </i>  
        {/* First Name */}
        <span className="grey-text" style={styles.label}> First Name : </span>
        <span style={styles.name}> { user.firstName }  </span> <br/>
        {/* Last Name */}
        <span className="grey-text" style={styles.label}> Last Name : </span>
        <span style={styles.name}> { user.lastName }  </span> <br/>
        {/* Email */}
        <span className="grey-text" style={styles.label}> Email : </span> 
        <span className="blue-text" style={styles.email}> { user.email } </span> <br/> 
        {/* User Type */}
        <span className="grey-text" style={styles.label}> User Type : </span>
        {user.userType !== 'employee' ? (
          <span className="indigo-text text-darken-2" style={styles.userType}> { user.userType } </span>
        ) : (
          <span className="cyan-text text-darken-1" style={styles.userType}> { user.userType } </span>
        )}    
      </div>
    </div>
  )
}

const styles = {
  header: {
    fontSize: '1.2em'
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
  }
}

ProfileTab.propTypes = {
  user: PropTypes.object.isRequired
}

export default ProfileTab;