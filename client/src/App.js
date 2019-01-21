import React, { Component } from 'react';
import './App.css';
import Login from './Components/Auth/Login.js';
import Register from './Components/Auth/Register.js';
import Page from './Components/Page/Page.js';
import SavePage from './Components/SavePage/SavePage.js';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    user: {},
    pages: [],
    sort: 'oldestToNewest',
    pageBeingViewed: '',
    authenticated: false,
    mousePosition: { x: 50, y: 50 }
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      await this.getUser();
      return this.setState({ authenticated: true });
    }
  }

  _onMouseMove = e => {
    this.setState({
      mousePosition: { x: e.clientX, y: e.clientY }
    });
  };

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

  handleViewPage = async page => {
    if (this.state.pageBeingViewed === page)
      await this.setState({ pageBeingViewed: '' });
    else await this.setState({ pageBeingViewed: page });

    const ref = document.getElementById(`${page}__header`);
    window.scrollTo(0, ref.offsetTop);
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

  handleRegister = async (username, password) => {
    try {
      const url = `${API_URL}/api/register`;
      const body = { username, password };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      console.log(response.status);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.err(err);
    }
  };

  handleLogin = async (username, password) => {
    try {
      const url = `${API_URL}/api/login`;
      const body = { username, password };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      const json = await response.json();
      const token = json.token;

      if (token) {
        localStorage.setItem('token', token);
        await this.getUser();
        return this.setState({ authenticated: true });
      } else if (json.error) return console.error(json.error);
      else return console.error('Token was not retrieved!');
    } catch (err) {
      console.error(err);
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ authenticated: false });
  };

  handleSorted = e => {
    this.setState({ sort: e.target.value });
  };

  render() {
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
      <div className="App">
        {this.state.authenticated ? (
          <div className="App__Container" onMouseMove={this._onMouseMove}>
            {this.state.mousePosition.y < 40 && (
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
                  background: 'rgba(0, 0, 0, 0.7)'
                }}
              >
                {this.state.user && <h1>Hello {this.state.user.username}</h1>}
                <button style={{ marginRight: '50px' }}onClick={this.handleLogout}>sign out</button>
              </div>
            )}
            <SavePage getUser={this.getUser} />
            <select id="sort" name="sort" onChange={this.handleSorted}>
              <option value="oldestToNewest">Oldest to Newest</option>
              <option value="newestToOldest">Newest to Oldest</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            {pages ? pages : <h3>Loading...</h3>}
          </div>
        ) : (
          <div className="App__Auth">
            <h1>Zen-gram</h1>
            <Login handleLogin={this.handleLogin} />
            <Register handleRegister={this.handleRegister} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
