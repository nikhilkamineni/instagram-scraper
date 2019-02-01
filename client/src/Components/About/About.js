import React from 'react';

import './About.css';

const About = props => {
  return (
    <div id="About">
      <h2>ABOUT</h2>
      <div id="About__content">
        <p id="content__about">
          <b>ZEN-GRAM</b> lets you follow your favorite Instagram accounts
          without signing up for Instagram.
        </p>
        <div id="content__getting-started">
          <h3>GETTING STARTED:</h3>
          <ol>
            <li>Register for a free acount and login</li>
            <li>
              Add some some instagram pages you want to follow using the
              accounts @handle
            </li>
            <li>Enjoy some distraction and addiction free social media!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;
