import React, { Component } from 'react';

import Menu from '../Menu/Menu'
import Page from '../Page/Page';
import SavePage from '../SavePage/SavePage'

class Home extends Component {
  render() {
    // if (!this.props.authenticated) return null;

    const sort = this.props.sort;
    let pages = this.props.pages
      ? this.props.pages.map(page => (
          <Page
            key={page._id}
            handle={page.handle}
            id={page._id}
            handleDeletePage={this.props.handleDeletePage}
            handleViewPage={this.props.handleViewPage}
            beingViewed={this.props.pageBeingViewed === page.handle}
          />
        ))
      : [];

    if (sort === 'newestToOldest') pages = pages.reverse();
    if (sort === 'alphabetical')
      pages = pages.sort((a, b) => {
        return a.props.handle.charCodeAt(0) - b.props.handle.charCodeAt(0);
      });

    return (
      <div className="App__Container" onMouseMove={this.props._onMouseMove}>
        <h1 style={{ color: '#368F8B' }}>ZEN-GRAM</h1>
        <Menu
          handleLogout={this.props.handleLogout}
          user={this.props.user}
          mouseIsMoving={this.props.mouseIsMoving}
          mousePosition={this.props.mousePosition}
        />

        <SavePage getUser={this.props.getUser} />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <select id="sort" name="sort" onChange={this.props.handleSorted}>
            <option
              value="oldestToNewest"
              selected={this.props.sort === 'oldestToNewest'}
            >
              Oldest to Newest
            </option>
            <option
              value="newestToOldest"
              selected={this.props.sort === 'newestToOldest'}
            >
              Newest to Oldest
            </option>
            <option
              value="alphabetical"
              selected={this.props.sort === 'alphabetical'}
            >
              Alphabetical
            </option>
          </select>
        </div>

        {pages ? pages : <h3>Loading...</h3>}
      </div>
    );
  }
}

export default Home;
