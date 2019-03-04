import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getStreams, deleteStream } from './../../state/actions/streamsActions';
import { isStreamCreatedByCurrentUser } from '../../helpers/streamsHelpers';

const $ = window.$;

const Streams = (props) => (
  props.streams.map((stream, id) => (
    <Stream key={id} {...stream} {...props} />
  ))
);

class Stream extends Component {
  render() {
    const {
      id,
      title,
      description,
      isEditable,
    } = this.props;

    return (
      <Fragment>
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
              {isEditable && (
                  <div className="extra">
                    <button class="tiny ui black basic button">
                      Edit
                    </button>
                    <button class="tiny ui negative basic button">
                      Delete
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}



class StreamList extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    const enhancedStreams = this.props.streams.map(stream => {
      return {
        ...stream,
        // to determine whether current user can interact with a stream
        isEditable: isStreamCreatedByCurrentUser(stream),
      }
    })

    console.log({ enhancedStreams });

    return (
      <div className="StreamList">
        <Streams
          {...this.props}
          streams={enhancedStreams || []}
        />
      </div>
    )
  }
};

const mapStateToProps = ({ auth, streams }) => {
  return {
    auth,
    streams,
  }
};

const mapDispatchToProps = {
  getStreams,
  deleteStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
