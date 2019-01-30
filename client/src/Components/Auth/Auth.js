import React from 'react';

import Login from './Login';
import Register from './Register';
import About from './About';

const Auth = props => {
  return (
    <div className="App__Auth">
      <Login
        className="Auth__Login"
        handleLogin={props.handleLogin}
        loginError={props.loginError}
      />
      <Register
        className="Auth__Register"
        handleRegister={props.handleRegister}
        registerError={props.registerError}
        registerSuccess={props.registerSuccess}
      />
      <About className="Auth__About" />
    </div>
  );
};

export default Auth;
