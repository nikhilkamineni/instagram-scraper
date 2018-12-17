import React, { Component } from 'react';

class Login extends Component {
  state = {};

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state
    this.props.handleLogin(username, password);
  };

  render() {
    return (
      <div>
        Username
        <input type="text" onChange={this.handleChange} name="username" />
        Password
        <input type="password" onChange={this.handleChange} name="password" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Login;
