import React from 'react';

import Auth from '../Auth/Auth';
import About from '../About/About';

import './Landing.css'

const Landing = props => {
  return (
    <div id="Landing">
      <About />
      <Auth
        handleLogin={props.handleLogin}
        handleRegister={props.handleRegister}
        loginError={props.loginError}
        loginLoading={props.loginLoading}
        registerError={props.registerError}
        registerLoading={props.registerLoading}
        registerSuccess={props.registerSuccess}
      />
    </div>
  );
};

export default Landing;
