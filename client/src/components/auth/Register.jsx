import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, error, loadUser, register, setAlert, ...props }) => {
  useEffect(() => {
    if(isAuthenticated) {
      props.history.push('/');
    }

    if(error) {
      error.errors.forEach(err => {
        setAlert(err.msg, 'danger');
      })
      
    }
  
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    password2: '',
    userType: 'employee'  
  });

  const { firstName, lastName, email, password, password2, userType } = user;

  // On Change 
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(password !== password2) {
      setAlert('Password did not match', 'danger');
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
        userType
      }); 
    }
  }

  return (
    <div className="form-container" id="register-form" style={styles.registerForm}>
      <h4 className="center">
        Account <span className="blue-text text-darken-2">Register</span>
      </h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" value={firstName} onChange={onChange} required/>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} minLength="6" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" required/>
        </div> 
        <br/>
        <div className="row">
          <div className="col s6 center"> 
            <strong>Choose</strong> <br/>
            <strong>
              <span className="blue-text text-darken-2">
                Account 
              </span>
              {' '} 
              Type
            </strong>
          </div>
          <div className="col s6">
            <label>
              <input className="with-gap" type="radio" name="userType" value="employee" onChange={onChange} checked={userType === 'employee'} /> 
              <span>Employee</span> {' '}
            </label>
            <br/>
            <label>
              <input className="with-gap" type="radio" name="userType" value="technician" onChange={onChange} checked={userType === 'technician'} />
              <span>Technician</span>
            </label>

          </div>
        </div>
        <br/>
        <input type="submit" value="Register" className="btn blue darken-2" style={styles.registerBtn}/>
      </form>
    </div>
  )
}

const styles = {
  registerForm : {
    width: "400px",
    margin: "30px auto"
  },
  registerBtn: {
    display: "block",
    margin: "0 auto"
  }
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(mapStateToProps, { register, setAlert })(Register);