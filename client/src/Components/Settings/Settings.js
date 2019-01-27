import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div id="Settings">
        <form id="Settings__ChangePassword">
          <input
            id="ChangePassword__password"
            type="password"
            name="password"
          />
          <input
            id="ChangePassword__confirmPassword"
            type="password"
            name="confirmPasword"
          />
          <input id="ChangePassword__submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Settings;
