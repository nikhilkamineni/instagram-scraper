import React, { Component } from 'react';
import './App.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  async componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/api/getData`;
    const body = {
      handle: this.props.handle
    };
    const options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ ...data });
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        {this.state.posts.map((post, i) => {
          return <img src={post.url} alt="" key={i} />;
        })}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/api/user/5bc38c93642e225002c834e7`
    try {
      const response = await fetch(url);
      const userData = await response.json();
      await this.setState({ user: userData });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const pages = this.state.user.pages;
    return (
      <div className="App">
      <h1>Hello {this.state.user.username}</h1>
        {pages &&
          pages.map(page => 
            <Page name={page.name} handle={page.handle} key={page._id} />
          )}
      </div>
    );
  }
}

export default App;
