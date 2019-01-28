import React, { Component } from 'react';
import { Redirect } from '@reach/router'

import Menu from '../Menu/Menu';
import Page from '../Page/Page';
import SavePage from '../SavePage/SavePage';

const API_URL = process.env.REACT_APP_API_URL;

class Home extends Component {
  state = {
    mouseIsMoving: false,
    mousePosition: { x: null, y: null },
    user: {},
    pages: [],
    pageBeingViewed: '',
    sort: 'newestToOldest'
  };

  async componentDidMount() {
    const token = await localStorage.getItem('token');
    if (token) {
      await this.getUser();
    }
  }

  getUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const url = `${API_URL}/api/user/get-user`;
      const options = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await fetch(url, options);
      const userData = await response.json();
      this.setState({ user: userData, pages: userData.pages });
    } catch (error) {
      console.error(error);
    }
  };

  _onMouseMove = (e, timer) => {
    this.setState({
      mousePosition: { x: e.clientX, y: e.clientY },
      mouseIsMoving: true
    });
    setTimeout(() => {
      this.setState({ mouseIsMoving: false });
    }, 2000);
  };

  handleDeletePage = async pageId => {
    try {
      const token = localStorage.getItem('token');
      if (token && pageId) {
        const url = `${API_URL}/api/user/delete-page`;
        const body = { pageId };
        const options = {
          method: 'put',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const response = await fetch(url, options);
        const json = await response.json();
        this.setState({
          user: json.updatedUser,
          pages: json.updatedUser.pages
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleViewPage = async page => {
    if (this.state.pageBeingViewed === page)
      await this.setState({ pageBeingViewed: '' });
    else await this.setState({ pageBeingViewed: page });

    const ref = document.getElementById(`${page}__header`);
    window.scrollTo(0, ref.offsetTop);
  };

  handleSorted = e => {
    this.setState({ sort: e.target.value });
  };

  render() {
    if (!this.props.authenticated) return <Redirect to="../" noThrow />;

    const sort = this.state.sort;
    let pages = this.state.pages
      ? this.state.pages.map(page => (
          <Page
            key={page._id}
            handle={page.handle}
            id={page._id}
            handleDeletePage={this.handleDeletePage}
            handleViewPage={this.handleViewPage}
            beingViewed={this.state.pageBeingViewed === page.handle}
          />
        ))
      : [];

    if (sort === 'newestToOldest') pages = pages.reverse();
    if (sort === 'alphabetical')
      pages = pages.sort((a, b) => {
        return a.props.handle.charCodeAt(0) - b.props.handle.charCodeAt(0);
      });

    return (
      <div className="App__Container" onMouseMove={this._onMouseMove}>
        <Menu
          handleLogout={this.props.handleLogout}
          user={this.state.user}
          mouseIsMoving={this.state.mouseIsMoving}
          mousePosition={this.state.mousePosition}
        />

        <SavePage getUser={this.getUser} />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <select
            id="sort"
            name="sort"
            onChange={this.handleSorted}
            value={this.state.sort}
          >
            <option value="oldestToNewest">Oldest to Newest</option>
            <option value="newestToOldest">Newest to Oldest</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {pages ? pages : <h3>Loading...</h3>}
      </div>
    );
  }
}

export default Home;
