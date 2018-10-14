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
    const url = `http://localhost:8000/api/getData/${this.props.handle}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ ...data });
    console.log('STATE: ', this.state.posts[0].url);
  }

  render() {
    return (
      <div>
        <header>{this.props.name}</header>
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
    try {
      const response = await fetch(
        'http://localhost:8000/api/user/5bc38c93642e225002c834e7'
      );
      const userData = await response.json();
      await this.setState({ user: userData });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const pages = this.state.user.pages;
    console.log('PAGES: ', pages);
    return (
      <div className="App">
        {this.state.user.pages &&
          this.state.user.pages
          .map(page => 
            <Page name={page.name} handle={page.handle} key={page._id} />
          )}
      </div>
    );
  }
}

export default App;
