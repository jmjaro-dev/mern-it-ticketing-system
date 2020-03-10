import React, { useState } from 'react';
import { connect } from 'react-redux';


const Login = props => {
  const [user, setUser] = useState({
    email:'',
    password: ''  
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(user.email === '' || password === '') {
      console.log('Please fill in all fields', 'danger');
    } else {
      console.log('User Logged in'); 
    }
  }

  return (
    <div className="form-container" id="login-form" style={styles.loginForm}>
      <h4 className="center">
        Account <span className="blue-text text-darken-2">Login</span>
      </h4>

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
        <input type="submit" value="Login" className="btn blue darken-2" style={styles.loginBtn}/>
      </form>
    </div>
  )
}

const styles = {
  loginForm : {
    width: "400px",
    margin: "30px auto"
  },
  loginBtn: {
    display: "block",
    margin: "0 auto"
  }
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, {})(Login);