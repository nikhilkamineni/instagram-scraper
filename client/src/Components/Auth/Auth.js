import React from 'react';

import Login from './Login';
import Register from './Register';

const Auth = props => {
  return (
    <div className="App__Auth">
      <Login handleLogin={props.handleLogin} loginError={props.loginError} />
      <Register
        handleRegister={props.handleRegister}
        registerError={props.registerError}
      />
    </div>
  );
};

export default Auth;
