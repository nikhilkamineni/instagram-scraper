import React, { Component } from 'react';
import './App.css';
import Page from './Components/Page.js';

const CreatePage = props => {
  async function handleSubmit(event) {
    event.preventDefault();
    const id = props.id;
    const handle = event.target.handle.value;
    const name = event.target.name.value;
    if (id && handle && name) {
      const url = `${process.env.REACT_APP_API_URL}/api/user/savePage`;
      const body = { id, name, handle };
      console.log(body);
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(url, options);
      const savedPage = await response.json();
      console.log(savedPage);
    } else {
      console.error('Missing an id, name and/or handle');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      Name <input type="text" name="name" /> <br/>
      Handle <input type="text" name="handle" /> <br/>
      Add
      <input type="submit" />
    </form>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    try {
      const url = `${
        process.env.REACT_APP_API_URL
      }/api/user/5bc38c93642e225002c834e7`;
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
        <CreatePage id={this.state.user._id} />
        {this.state.user.pages ? (
          this.state.user.pages.map(page => (
            <Page name={page.name} handle={page.handle} key={page._id} />
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;
