import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Comments from './components/comments/Comments';
import users from './assets/data/users.json';
import comments from './assets/data/comments.json';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    }

    this.getComments = this.getComments.bind(this);
  }

  componentWillMount() {
    this.getComments();
  }

  async getComments() {
    // const users = await axios.get('./../assets/data/users.json');
    // const comments = await axios.get('./../assets/data/comments.json');

    const allComments = comments.map(comment => {
      const author = users.find(user => {
        return user.id === comment.author;
      })
      return {
        ...comment,
        author: author && author.name,
      }
    });
    console.log(comments);
    this.setState({
      comments: allComments
    });
  }

  render() {
    return (
      <div className="App">
        <Comments comments={this.state.comments} />
      </div>
    );
  }
}

export default App;
