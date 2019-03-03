import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getStreams } from './../../state/actions/streamsActions';
import { isStreamCreatedByCurrentUser, getStreamsById } from '../../helpers/streamsHelpers';
import ConfirmStreamDeleteModal from './../elements/ConfirmStreamDeleteModal';

const $ = window.$;

const Streams = (props) => (
  props.streams.map((stream, id) => (
    <Stream key={id} {...stream} />
  ))
);

const defaultState = {
  showConfirmStreamDeleteModal: false,
  streamToDelete: null,
}
class Stream extends Component {
  state = {
    ...defaultState,
  }

  // ran when an user clicks on the delete button of a stream
  onAttemptToDelete(streamId) {
    this.setState({
      showConfirmStreamDeleteModal: true,
      streamToDelete: getStreamsById(streamId),
    })
  }

  resetState = () => {
    this.setState({
      ...defaultState
    })
  }

  // ran when an user confirms on the ConfirmStreamDeleteModal to delete a stream
  onConfirmToDelete(streamId) {
    console.log('YES, PLEASE DELETE!', { streamId });
    this.resetState();
  }

  // ran when an user denies on the ConfirmStreamDeleteModal to delete a stream
  onDenyToDelete(streamId) {
    console.log('YES, PLEASE DELETE!', { streamId });
    this.resetState();
  }

  render() {
    const {
      id,
      title,
      description,
      isEditable,
    } = this.props;
    console.log({ showConfirmStreamDeleteModal: this.state.showConfirmStreamDeleteModal });
    return (
      <Fragment>
        {this.state.showConfirmStreamDeleteModal && this.state.streamToDelete &&
          <ConfirmStreamDeleteModal
            stream={this.state.streamToDelete}
            onConfirm={(streamId) => this.onConfirmToDelete(streamId)}
            onDeny={(streamId) => this.onDenyToDelete(streamId)}
          />
        }

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
                    <button class="tiny ui negative basic button" onClick={() => this.onAttemptToDelete(id)}>
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
  // state = {
  //   showConfirmStreamDeleteModal: false,
  //   activeStream: null,
  // }

  componentDidMount() {
    this.props.getStreams();
  }

  // onConfirmToDelete(streamId) {
  //   this.setState({
  //     activeStream: getStreamsById(streamId),
  //     showConfirmStreamDeleteModal: true,
  //   })
  // }

  reset

  render() {
    const shapedStreams = this.props.streams.map(stream => {
      return {
        ...stream,
        // to determine whether current user can interact with a stream
        isEditable: isStreamCreatedByCurrentUser(stream),
      }
    })

    console.log({ shapedStreams });

    return (
      <div className="StreamList">
        <Streams
          streams={shapedStreams || []}
          // onConfirmToDelete={(streamId) => this.onConfirmToDelete(streamId)}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
