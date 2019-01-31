import React from 'react';

import './Register.css'

const Register = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    props.handleRegister(username, password, confirmPassword);
  };

  return (
    <div id="Register">
      <h2>REGISTER</h2>

      <form
        className="Register__form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form__username">
          <label className="textInputLabel">USERNAME</label>
          <br />
          <input className="textInput" type="text" name="username" />
        </div>

        <div className="form__password">
          <label className="textInputLabel">PASSWORD</label>
          <br />
          <input className="textInput" type="password" name="password" />
        </div>

        <div className="form__confirmPassword">
          <label className="textInputLabel">CONFIRM PASSWORD</label>
          <br />
          <input className="textInput" type="password" name="confirmPassword" />
        </div>

        <div className="form__submit">
          <input type="submit" value="SUBMIT" />
        </div>

        <p>{props.registerError}</p>

        {props.registerSuccess && <p>New user succesfully registered!</p>}
      </form>
    </div>
  );
};

export default Register;
