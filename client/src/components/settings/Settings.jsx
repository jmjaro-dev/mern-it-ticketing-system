import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AccountSettings from './AccountSettings';
import SecuritySettings from './SecuritySettings';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('#account');
  
  useEffect(() => {
    M.AutoInit();
  },[]); 

  const setActive = e => {
    e.preventDefault();

    setActiveTab(e.target.getAttribute('href'));
  }

  return (
    <div className="row card-panel">
      {user && (
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col">
              <a className="active" href="#account" onClick={setActive} >
                Account Settings
              </a>
            </li>
            <li className="tab col">
              <a  href="#security" onClick={setActive} >Security</a>
            </li>
          </ul>
          <div className="row">
            {activeTab !== '#account' ? <SecuritySettings user={user}/> :  <AccountSettings user={user}/>}
          </div>
      </div> 
      )}
    </div>
  )
}

Settings.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Settings);