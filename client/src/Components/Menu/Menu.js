import React from 'react';

const Menu = props => {
  return (
    <div
      className="menu"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        padding: '5px 25px',
        alignItems: 'center',
        height: '50px',
        width: '100vw',
        background: '#612940',
        zIndex: '11'
      }}
    >
      <h1>ZEN-GRAM</h1>
      {props.user && <h1>HELLO {props.user.username}</h1>}
      <button
        style={{ marginRight: '50px', fontWeight: 'bold', border: 'none' }}
        onClick={props.handleLogout}
      >
        SIGN OUT
      </button>
    </div>
  );
};

export default Menu;
