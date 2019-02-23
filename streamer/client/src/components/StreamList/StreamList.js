import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStreams } from './../../state/actions/streamsActions';

const Streams = ({ streams = [] }) => (
  streams.map(({ id, title, description }) => (
    <Stream key={id} title={title} description={description} />
  ))
);

const Stream = ({ title = '', description = '' }) => (
  <div className="ui items">
    <div className="item">
      <a href="/" className="ui tiny image">
        <img src="https://semantic-ui.com/images/avatar/large/stevie.jpg" alt="User Avatar" />
      </a>
      <div className="content">
        <a href="/" className="header">{title}</a>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  </div>
);
class StreamList extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    return (
      <div className="StreamList">
        <Streams streams={this.props.streams || []} />
      </div>
    )
  }
};

const mapStateToProps = ({ streams }) => {
  return {
    streams,
  }
};

const mapDispatchToProps = {
  getStreams,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
