import React from 'react';

import './Menu.css';

const Menu = props => {
  return (
    <div
      id="Menu"
      className={
        props.mouseIsMoving || props.mousePosition.y < 70
          ? 'Menu-visible'
          : 'Menu-hidden'
      }
    >
      <h1>ZEN-GRAM</h1>
      {props.user && <h1>HELLO {props.user.username}</h1>}
      <button id="Menu__submit-button" onClick={props.handleLogout}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Menu;
