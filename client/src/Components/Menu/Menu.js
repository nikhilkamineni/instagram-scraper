import React from 'react';
import { Link } from '@reach/router';

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

      <div id="Menu__links">
        <Link to="/settings">
          <button id="settings-button" className="Menu__button">
            SETTINGS
          </button>
        </Link>

        <button
          id="signout-button"
          className="Menu__button"
          onClick={props.handleLogout}
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default Menu;
