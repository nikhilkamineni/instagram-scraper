import React from 'react';

import './About.css';

const About = props => {
  return (
    <div id="About">
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
              Add some some instagram pages you want to follow using the @handle
            </li>
            <li>Enjoy some distraction and addiction free social media!</li>
          </ol>
        </div>

        <div id="content__fork-me">
          <a href="https://github.com/nikhilkamineni/zen-gram">
            Fork me on Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
