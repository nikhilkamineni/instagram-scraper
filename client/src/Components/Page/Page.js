import React, { Component } from 'react';
import './Page.css';

class Page extends Component {
  state = {
    posts: [],
    name: null,
    error: null,
    message: null
  };

  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/get-data?handle=${
        this.props.handle
      }`;

      const response = await fetch(url);
      const data = await response.json();
      this.setState({ ...data });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  handleOpenSource = () => {
    window.open(`https://www.instagram.com/${this.props.handle}`, '_blank');
  };

  render() {
    return (
      <div className="Page" id={this.props.handle}>
        <div className="Page__header" id={`${this.props.handle}__header`}>
          <h2 onClick={() => this.props.handleViewPage(this.props.handle)}>
            {this.props.handle.toUpperCase()}
          </h2>
          <button className="header-link" onClick={this.handleOpenSource}>
            SRC
          </button>
          <button
            className="header-link"
            onClick={() => this.props.handleDeletePage(this.props.id)}
          >
            X
          </button>
        </div>
        {this.props.beingViewed && (
          <div
            className="Posts"
            onClick={() => this.props.handleViewPage(this.props.handle)}
          >
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
