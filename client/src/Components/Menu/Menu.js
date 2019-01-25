import React from 'react';

import './Menu.css';

function getMenuClassname(mouseIsMoving, mousePosition) {
  if (mousePosition.y < 70) return 'Menu-visible';
  else if (mouseIsMoving) return 'Menu-peeking';
  else return 'Menu-hidden';
}

const Menu = props => {
  return (
    <div
      id="Menu"
      className={getMenuClassname(props.mouseIsMoving, props.mousePosition)}
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
