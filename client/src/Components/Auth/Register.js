import React from 'react';

const Register = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      // TODO: show error message to user
      // TODO: check for password length
      return console.error('Passwords do not match!');
    }
    props.handleRegister(username, password);
  };
  return (
    <div>
      <h3>Register</h3>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        Username
        <input type="text" name="username" />
        <br />
        Password
        <input type="password" name="password" />
        <br />
        Confirm Password
        <input type="password" name="confirmPassword" />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Register;
