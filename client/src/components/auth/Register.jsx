import React, { useState } from 'react';

const Register = props => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    password2: '',
    userType: ''  
  });

  const { firstName, lastName, email, password, password2, userType } = user;

  // On Change 
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(password !== password) {
      console.log('Password did not match');
    } else {
      console.log('User registered successfully'); 
    }
  }

  return (
    <div className="form-container" id="login-form" style={styles.loginForm}>
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
          <input type="password" name="password" value={password} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required/>
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

export default Register;