import React, { Component } from 'react';
import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: null,
      message: null
    };
  }

  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/getData`;
      const body = { handle: this.props.handle };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };

      const response = await fetch(url, options);
      const data = await response.json();
      this.setState({ ...data });
      console.log(this.state)
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div className="Page">
        <h2 onClick={() => this.toggleShow()}>{this.props.name}</h2>
        {this.state.show && (
          <div className="Posts">
            {this.state.message ? (
              <p>{this.state.message}</p>
            ) : (
              this.state.posts.map((post, i) => {
                return <img src={post.url} alt="" key={i} />;
              })
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Page;
