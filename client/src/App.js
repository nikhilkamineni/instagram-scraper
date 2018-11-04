import React, { Component } from 'react';
import './App.css';
import Page from './Components/Page/Page.js';
import SavePage from './Components/SavePage/SavePage.js';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    user: {},
    pageBeingViewed: ''
  };

  getUserData = async () => {
    try {
      const url = `${API_URL}/api/user/5bc38c93642e225002c834e7`;
      const response = await fetch(url);
      const userData = await response.json();
      this.setState({ user: userData });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getUserData();
  }

  handleViewPage = async page => {
    if (this.state.pageBeingViewed === page)
      await this.setState({ pageBeingViewed: '' })
    else
      await this.setState({ pageBeingViewed: page })

    const ref = document.getElementById(`${page}__header`);
    window.scrollTo(0, ref.offsetTop);
  }

  handleDeletePage = async pageId => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/user/deletePage`;
      const userId = this.state.user._id;
      const body = { userId, pageId };
      const options = {
        method: 'put',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      const json = await response.json();
      this.setState({ user: json.updatedUser });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.user && <h1>Hello {this.state.user.username}</h1>}
        <SavePage id={this.state.user._id} getUserData={this.getUserData} />
        {this.state.user.pages ? (
          this.state.user.pages.map(page => (
            <Page
              key={page._id}
              handle={page.handle}
              id={page._id}
              handleDeletePage={this.handleDeletePage}
              handleViewPage={this.handleViewPage}
              pageBeingViewed={this.state.pageBeingViewed === page.handle}
            />
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;
