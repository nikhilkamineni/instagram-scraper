import React from 'react';
import './Login.css';

const Login = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    props.handleLogin(username, password);
  };

  return (
    <form
      className="LoginForm"
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      Username
      <input className="LoginForm__username"type="text" name="username" />
      <br />
      Password
      <input className="LoginForm__password"type="password" name="password" />
      <br />
      <input className="LoginForm__submit"type="submit" value="submit" />
    </form>
  );
};

export default Login;
