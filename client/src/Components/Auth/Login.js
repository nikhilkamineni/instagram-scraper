import React from 'react';
import styled from '@emotion/styled';

const LoginStyled = styled.div`
  border: 1px solid grey;
  width: 300px;
  margin: 30px auto;
  padding: 10px;

  .textInput {
    border: none;
    height: 20px;
    background-color: #444444;
    color: white;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
  }

  .form__submit {
    padding-bottom: 20px;
    padding-top: 10px;

    input {
      width: 90px;
      height: 40px;
      padding: 10px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
      color: white;
      background-color: #000000;
      border: none;
      &:hover {
        border: 1px solid grey;
      }
    }
  }
`;

const Login = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    props.handleLogin(username, password);
  };

  return (
    <LoginStyled>
      <h2>Login</h2>
      <form
        className="Login__form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form__username">
          <label style={{ fontWeight: 'bold' }}>Username</label>
          <br />
          <input className="textInput" type="text" name="username" />
        </div>
        <div className="form__password">
          <label style={{ fontWeight: 'bold' }}>Password</label>
          <br />
          <input className="textInput" type="password" name="password" />
        </div>
        <div className="form__submit">
          <input className="LoginForm__submit" type="submit" value="submit" />
        </div>
      </form>
    </LoginStyled>
  );
};

export default Login;
