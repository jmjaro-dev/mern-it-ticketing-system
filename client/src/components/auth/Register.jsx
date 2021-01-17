import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, error, register, setAlert, ...props }) => {
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
    <div className="form-container card-panel" id="register-form" style={styles.registerForm}>
      <h5 className="center">
        <FontAwesomeIcon icon='user-plus' style={{ marginRight: '0.35em'}} className="blue-text text-darken-2"/>
        <span className="grey-text text-darken-4"> Register</span>
      </h5>
      <form onSubmit={onSubmit}>
        {/* firstName & lastName */}
        <div className="row">
          <div className="form-group col s12 m6">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={firstName} onChange={onChange} required/>
          </div>

          <div className="form-group col s12 m6">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={lastName} onChange={onChange} required/>
          </div>
        </div>
        {/* email */}
        <div className="row">
          <div className="form-group col s12">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={onChange} required/>
          </div>
        </div>
        <div className="row">
          <div className="form-group col s12 m6">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} minLength="6" required/>
          </div>
          <div className="form-group col s12 m6">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" required/>
          </div> 
        </div>
        <div className="row">
          {password !== '' && password2 !== '' && (
            <Fragment>
              {password !== password2 ? (
                <span className= 'col s12 center red-text text-darken-2' style={styles.pass_hint}>Password does not match</span>
              ) : (
                <span className= 'col s12 center green-text text-darken-2' style={styles.pass_hint}>Password match</span>
              )}
            </Fragment>
          )}
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
        <p>Already have an account? Login <Link to="/login">here</Link>.</p>
        <br/>
        <input type="submit" value="Register" className="btn blue darken-2" style={styles.registerBtn}/>
      </form>
    </div>
  )
}

const styles = {
  registerForm : {
    maxWidth: "400px",
    minWidth: "200px",
    margin: "10px auto"
  },
  registerBtn: {
    display: "block",
    margin: "0 auto"
  },
  pass_hint: {
    fontSize: "0.8em",
    fontWeight: "bold"
  }
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.authError
});

export default connect(mapStateToProps, { register, setAlert })(Register);