import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';

import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings';

import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    user: {},
    pages: [],
    authenticated: false,
    loginError: null,
    registerError: null
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) return this.setState({ authenticated: true });
  }

  handleRegister = async (username, password) => {
    try {
      const url = `${API_URL}/api/auth/register`;
      const body = { username, password };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      if (response.status === 201)
        console.log('New user was registered successfully!');
      // TODO: Login user automatically after succesfull login
    } catch (err) {
      console.err(err);
    }
  };

  handleLogin = async (username, password) => {
    try {
      const url = `${API_URL}/api/auth/login`;
      const body = { username, password };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.status === 200) {
        const token = json.token;
        console.log(response.status);

        if (token) {
          localStorage.setItem('token', token);
          this.setState({ authenticated: true });
          navigate('/home');
        }
      } else if (response.status === 422) {
        return this.setState({ loginError: json.error })
      }
    } catch (err) {
      this.setState({ loginError: 'Error logging in!' });
      console.error(err);
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ authenticated: false });
    navigate('/');
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ color: '#368F8B' }}>ZEN-GRAM</h1>
        <Router>
          <Home
            path="/home"
            handleLogout={this.handleLogout}
            authenticated={this.state.authenticated}
          />
          <Settings path="/settings" authenticated={this.state.authenticated} />
          <Auth
            path="/"
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            loginError={this.state.loginError}
            registerError={this.state.registerError}
          />
        </Router>
      </div>
    );
  }
}

export default App;
