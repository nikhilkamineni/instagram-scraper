import React from 'react';
import styled from '@emotion/styled';

const RegisterStyled = styled.div`
  border: 1px solid grey;
  width: 300px;
  margin: 30px auto;
  padding: 10px;

  .form__submit {
    padding-bottom: 20px;
    padding-top: 10px;
    input {
      width: 80px;
      height: 40px;
      font-weight: bold;
      cursor: pointer;
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
      <h2>Register</h2>
      <form
        className="Register__form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form__username">
          <label style={{ fontWeight: 'bold' }}>Username</label>
          <br />
          <input type="text" name="username" style={{ fontWeight: 'bold' }} />
        </div>
        <div className="form__password">
          <label style={{ fontWeight: 'bold' }}>Password</label>
          <br />
          <input type="password" name="password" />
        </div>
        <div className="form__confirmPassword">
          <label style={{ fontWeight: 'bold' }}>Confirm Password</label>
          <br />
          <input type="password" name="confirmPassword" />
        </div>
        <div className="form__submit">
          <input type="submit" value="submit"/>
        </div>
      </form>
    </RegisterStyled>
  );
};

export default Register;
