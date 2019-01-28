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
    authenticated: false
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
      if (response.status === 201) console.log('New user was registered successfully!')
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
      const token = json.token;

      if (token) {
        localStorage.setItem('token', token);
        this.setState({ authenticated: true });
        navigate('/home');
      } else if (json.error) return console.error(json.error);
      else return console.error('Token was not retrieved!');
    } catch (err) {
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
          />
        </Router>
      </div>
    );
  }
}

export default App;
