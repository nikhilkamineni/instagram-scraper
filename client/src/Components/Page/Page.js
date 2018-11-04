import React, { Component } from 'react';
import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      name: null,
      error: null,
      message: null
    };
  }

  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/getData?handle=${
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

  render() {
    return (
      <div className="Page" id={this.props.handle}>
        <div className="Page__header" id={`${this.props.handle}__header`}>
          <h2 onClick={() => this.props.handleViewPage(this.props.handle)}>
            {this.state.name} a.k.a {this.props.handle}
          </h2>
          <button onClick={() => this.props.handleDeletePage(this.props.id)}>
            Delete
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
