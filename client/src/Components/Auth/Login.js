import React, { Component } from 'react';

class Login extends Component {
  state = {};

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        Username
        <input type="text" onChange={this.handleChange} name="username"/>
        Password
        <input type="password" onChange={this.handleChange} password="password"/>
      </div>
    );
  }
}

export default Login;
