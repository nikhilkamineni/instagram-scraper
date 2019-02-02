import React from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';

const Auth = props => {
  return (
    <div className="Auth">
      <Login
        className="Auth__Login"
        handleLogin={props.handleLogin}
        loginError={props.loginError}
        loginLoading={props.loginLoading}
      />
      <Register
        className="Auth__Register"
        handleRegister={props.handleRegister}
        registerError={props.registerError}
        registerLoading={props.registerLoading}
        registerSuccess={props.registerSuccess}
      />
    </div>
  );
};

export default Auth;
