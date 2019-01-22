import React from 'react';
import styled from '@emotion/styled';

const RegisterStyled = styled.div`
  border: 4px solid orange;
  width: 300px;
  margin: 30px auto;
  padding: 20px;
  color: orange;

  .Register__form {
    margin-top: 20px;
  }
  
  .textInput {
    border: none;
    height: 20px;
    width: 180px;
    background-color: orange;
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .textInputLabel {
    font-weight: bold;
  }

  .form__submit {
    padding-bottom: 20px;
    padding-top: 10px;
    color: orange;

    input {
      width: 90px;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      background-color: orange;
      color: black;
      border: 4px solid orange;
      &:hover {
        background-color: black;
        color: orange;
      }
    }
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
      <h2>REGISTER</h2>
      <form
        className="Register__form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form__username">
          <label className="textInputLabel">
            USERNAME
          </label>
          <br />
          <input className="textInput" type="text" name="username" />
        </div>
        <div className="form__password">
          <label className="textInputLabel">
            PASSWORD
          </label>
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
      </form>
    </RegisterStyled>
  );
};

export default Register;
