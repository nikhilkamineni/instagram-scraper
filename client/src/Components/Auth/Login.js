import React from 'react';
import styled from '@emotion/styled';

const LoginStyled = styled.div`
  border: 3px solid #368F8B;
  width: 300px;
  margin: 30px auto;
  padding: 20px;
  color: #368F8B;

  h2 {
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
  }

  .textInput {
    border: none;
    height: 20px;
    width: 180px;
    background-color: #368F8B;
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    border: 4px solid #368F8B;
    margin: 5px;

    &:active, &:focus {
      background-color: #19150c;
      color: #368F8B;
    }
  }

  .textInputLabel {
    font-weight: bold;
    font-style: italic;
    color: #368F8B;
  }

  .Login__form {
    margin-top: 20px;
  }

  .form__password {
    margin-top: 20px;
  }

  .form__submit {
    padding-bottom: 20px;
    padding-top: 10px;

    input {
      width: 90px;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      color: black;
      background-color: #368F8B;
      border: 4px solid #368F8B;
      &:hover {
        background-color: black;
        color: #368F8B;
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
      </form>
    </LoginStyled>
  );
};

export default Login;
