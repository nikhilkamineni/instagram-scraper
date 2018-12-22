import React from 'react';

const Login = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    props.handleLogin(username, password);
  };

  return (
    <form
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      Username
      <input type="text" name="username" />
      Password
      <input type="password" name="password" />
      <input type="submit" />
    </form>
  );
};

export default Login;
