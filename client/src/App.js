import React, { Component } from 'react';
import './App.css';
import Page from './Components/Page.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/user/5bc38c93642e225002c834e7`
      const response = await fetch(url);
      const userData = await response.json();
      await this.setState({ user: userData });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App">
      {this.state.user && <h1>Hello {this.state.user.username}</h1>}
        {this.state.user.pages ?
          this.state.user.pages.map(page => 
            <Page name={page.name} handle={page.handle} key={page._id} />
          ) : <h3>Loading...</h3>}
      </div>
    );
  }
}

export default App;