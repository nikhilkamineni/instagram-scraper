import React from 'react';
import styled from '@emotion/styled';

const RegisterStyled = styled.div`
  border: 3px solid #612940;
  width: 300px;
  margin: 30px auto;
  padding: 20px;
  color: #612940;

  h2 {
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
  }

  .Register__form {
    margin-top: 20px;
  }

  .textInput {
    border: none;
    height: 20px;
    width: 180px;
    background-color: #612940;
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 20px;
    border: 4px solid #612940;
    margin-top: 5px;

    &:active, &:focus {
      background-color: #19150c;
      color: #612940;
    }
  }

  .textInputLabel {
    font-weight: bold;
    font-style: italic;
  }

  .form__submit {
    padding-bottom: 20px;
    color: #612940;

    input {
      width: 90px;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      background-color: #612940;
      color: black;
      border: 4px solid #612940;
      &:hover {
        background-color: black;
        color: #612940;
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
      </form>
    </RegisterStyled>
  );
};

export default Register;
