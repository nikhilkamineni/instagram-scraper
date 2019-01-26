import React from 'react';

import Login from './Login';
import Register from './Register';

const Auth = props => {
  return (
    <div className="App__Auth">
      <h1 style={{ color: '#368F8B' }}>ZEN-GRAM</h1>
      <Login handleLogin={props.handleLogin} />
      <Register handleRegister={props.handleRegister} />
    </div>
  );
};

export default Auth;
