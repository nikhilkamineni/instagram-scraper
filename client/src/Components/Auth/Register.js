import React from 'react';

const Register = props => {
  return (
    <form>
      Username
      <input type="text" name="username" />
      <br />
      Password
      <input type="password" name="password" />
      <br />
      Confirm Password
      <input type="password" name="confirmPassword" />
      <br />
      <input type="submit" value="submit"/>
    </form>
  );
};

export default Register;
