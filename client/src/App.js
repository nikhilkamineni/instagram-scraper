import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import Settings from "./Components/Settings/Settings";

import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    user: {},
    pages: [],
    authenticated: false,
    loginError: null,
    loginLoading: false,
    registerError: null,
    registerLoading: false,
    registerSuccess: false
  };

  async componentDidMount() {
    const token = await localStorage.getItem("token");
    if (token) {
      await this.setState({ authenticated: true });
      navigate("/home");
    }
  }

  handleRegister = async (username, password, confirmPassword) => {
    this.setState({
      registerError: null,
      registerLoading: true,
      registerSuccess: false
    });

    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return this.setState({ registerError: "Passwords do not match!" });
    }

    try {
      const url = `${API_URL}/api/auth/register`;
      const body = { username, password };
      const options = {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      };

      const response = await fetch(url, options);

      // Success
      if (response.status === 201) {
        this.setState({ registerSuccess: true, registerLoading: false });
        this.handleLogin(username, password);
      }
      // Failure
      else if (response.status === 422) {
        const json = await response.json();
        console.error(json.error);
        return this.setState({
          registerError: json.error,
          registerLoading: false
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleLogin = async (username, password) => {
    this.setState({ loginError: null, loginLoading: true });
    try {
      const url = `${API_URL}/api/auth/login`;
      const body = { username, password };
      const options = {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      };

      const response = await fetch(url, options);
      const json = await response.json();

      // Success
      if (response.status === 200) {
        const token = json.token;

        if (token) {
          localStorage.setItem("token", token);
          this.setState({
            authenticated: true,
            loginLoading: false,
            registerSuccess: false
          });
          navigate("/home");
        }
      }
      // Failure
      else if (response.status === 422) {
        return this.setState({ loginError: json.error });
      }
    } catch (err) {
      this.setState({ loginError: "Error logging in!", loginLoading: false });
      console.error(err);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ authenticated: false });
    navigate("/");
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ color: "#368F8B" }}>ZEN-GRAM</h1>
        <Router>
          <Home
            path="/home"
            handleLogout={this.handleLogout}
            authenticated={this.state.authenticated}
          />
          <Settings path="/settings" authenticated={this.state.authenticated} />
          <Landing
            path="/"
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            loginError={this.state.loginError}
            loginLoading={this.state.loginLoading}
            registerError={this.state.registerError}
            registerLoading={this.state.registerLoading}
            registerSuccess={this.state.registerSuccess}
          />
        </Router>
      </div>
    );
  }
}

export default App;
