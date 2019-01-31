import React from 'react';

import Auth from '../Auth/Auth';
import About from '../About/About';

import './Landing.css'

const Landing = props => {
  return (
    <div id="Landing">
      <Auth
        handleLogin={props.handleLogin}
        handleRegister={props.handleRegister}
        loginError={props.loginError}
        registerError={props.registerError}
        registerSuccess={props.registerSuccess}
      />
      <About />
    </div>
  );
};

export default Landing;
