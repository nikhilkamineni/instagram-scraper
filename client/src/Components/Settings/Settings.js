import React, { Component } from 'react';
import { Link } from '@reach/router';

import './Settings.css';

class Settings extends Component {
  state = {
    error: null,
    success: null
  };

  handleChangePasswordSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, success: null });

    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword)
      return this.setState({ error: 'Passwords do not match!' });
    else if (newPassword.length < 3)
      return this.setState({ error: 'Password is too short!' });
    else {
      //TODO: Make backedn API call
      return this.setState({ success: 'Password was changed successfully!' });
    }
  };
  render() {
    return (
      <div id="Settings">
        <h1>Settings</h1>
        <div>
          <h2>Change Password</h2>
          <form
            id="Settings__ChangePassword"
            onSubmit={this.handleChangePasswordSubmit}
          >
            <label htmlFor="newPassword" className="ChangePassword__label">
              New Password
            </label>
            <input
              id="newPassword-input"
              className="ChangePassword__input"
              type="password"
              name="newPassword"
            />

            <label
              htmlFor="confirmNewPassword"
              className="ChangePassword__label"
            >
              Confirm New Password
            </label>
            <input
              id="ChangePassword__confirmNewPassword"
              className="ChangePassword__input"
              type="password"
              name="confirmNewPassword"
            />

            <button id="ChangePassword__submit" type="submit" value="submit">
              submit
            </button>
            <p id="ChangePassword__error">{this.state.error}</p>
            <p id="ChangePassword__success">{this.state.success}</p>
          </form>
        </div>
        <Link to="/home">back</Link>
      </div>
    );
  }
}

export default Settings;
