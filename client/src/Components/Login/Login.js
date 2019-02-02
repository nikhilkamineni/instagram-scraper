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
    <div id="Login">
      <h2>LOGIN</h2>

      <form
        className="Login__form"
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

        <div className="form__submit">
          <input className="LoginForm__submit" type="submit" value="SUBMIT" />
        </div>
        <p>{props.loginError}</p>
        {props.loginLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default Login;
