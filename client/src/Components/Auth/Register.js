import React from 'react';
import styled from '@emotion/styled';

const RegisterStyled = styled.div`
  border: 1px solid grey;
  width: 300px;
  margin: 30px auto;
  padding: 10px;

  .textInput {
    border: none;
    height: 20px;
    width: 180px;
    background-color: #444444;
    color: white;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 20px;
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
  .textInputLabel {
    font-weight: bold;
  }
`;

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
    <RegisterStyled>
      <h2>Register</h2>
      <form
        className="Register__form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form__username">
          <label className="textInputLabel">
            Username
          </label>
          <br />
          <input className="textInput" type="text" name="username" />
        </div>
        <div className="form__password">
          <label className="textInputLabel">
            Password
          </label>
          <br />
          <input className="textInput" type="password" name="password" />
        </div>
        <div className="form__confirmPassword">
          <label className="textInputLabel">Confirm Password</label>
          <br />
          <input className="textInput" type="password" name="confirmPassword" />
        </div>
        <div className="form__submit">
          <input type="submit" value="submit" />
        </div>
      </form>
    </RegisterStyled>
  );
};

export default Register;
