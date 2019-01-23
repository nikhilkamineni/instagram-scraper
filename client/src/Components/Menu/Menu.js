import React from 'react';

import './Menu.css';

const Menu = props => {
  return (
    <div id="Menu">
      <h1>ZEN-GRAM</h1>
      {props.user && <h1>HELLO {props.user.username}</h1>}
      <button
        id="Menu__submit-button"
        onClick={props.handleLogout}
      >
        SIGN OUT
      </button>
    </div>
  );
};

export default Menu;
