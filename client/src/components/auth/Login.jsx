import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { login } from '../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Login =  ({ isAuthenticated, error, login, setAlert, ...props })  => {
  // Check if user is authenticated
  useEffect(() => {
    if(isAuthenticated) {
      props.history.push('/');
    }

    if(error) {
      setAlert(error.msg, 'danger');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email:'',
    password: ''  
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(user.email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  }

  return (
    <div className="form-container card-panel" id="login-form" style={styles.loginForm}>
      <h5 className="center">
        <FontAwesomeIcon icon='sign-in-alt' style={{ marginRight: '0.35em'}} className="blue-text text-darken-2" />
        <span className="grey-text text-darken-4">Login</span>
      </h5>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required/>
        </div>
        <br/>
        <p>No Account yet? Register <Link to="/register">here</Link>.</p>
        <br/>
        <input type="submit" value="Login" className="btn blue darken-2" style={styles.loginBtn}/>
      </form>
    </div>
  )
}

const styles = {
  loginForm : {
    minWidth: "200px",
    maxWidth: "400px",
    margin: "10px auto"
  },
  loginBtn: {
    display: "block",
    margin: "0 auto"
  }
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.authError
});

export default connect(mapStateToProps, { login, setAlert })(Login);