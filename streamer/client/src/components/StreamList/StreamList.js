import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStreams } from './../../state/actions/streamsActions';
import { isStreamCreatedByCurrentUser } from '../../helpers/streamsHelpers';

const $ = window.$;

const Streams = (props) => (
  props.streams.map((stream, id) => (
    <Stream key={id} {...stream} {...props} />
  ))
);

const Stream = ({
  title,
  description,
  createdBy,
  isEditable,
  onConfirmToDelete,
  ...props,
}) => {
  return (
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
                <button class="tiny ui negative basic button" onClick={() => onConfirmToDelete(props.stream)}>
                  Delete
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

class ConfirmStreamDeleteModal extends Component {
  componentDidMount() {
    this.showModal()
  }

  componentWillUnmount() {
    this.hideModal();
  }

  showModal = () => {
    $('.ui.modal').modal('show');
  }

  hideModal = () => {
    $('.ui.modal').modal('hide');
  }

  onConfirm = (stream) => {
    this.props.onConfirm(stream);
  }

  onDeny(stream) {
    this.props.onDeny(stream);
  }

  render() {
    console.log(this.props.stream);
    return (
      <div
        className="ui tiny modal"
        style={{
          display: 'block !important'
        }}
      >
        <div className="header">
          Delete Stream
        </div>
        <div className="content">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="actions">
          <div className="ui negative button" onClick={() => this.onDeny(this.props.stream)}>
            No
          </div>
          <div className="ui positive right labeled icon button" onClick={() => this.onConfirm(this.props.stream)}>
            Yes
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    )
  }
}

class StreamList extends Component {
  state = {
    showConfirmStreamDeleteModal: false,
    activeStream: null,
  }

  componentDidMount() {
    this.props.getStreams();
  }

  onConfirmToDelete(stream) {
    this.setState({
      activeStream: stream,
      showConfirmStreamDeleteModal: true,
    })
  }

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
        {this.state.showConfirmStreamDeleteModal &&
          <ConfirmStreamDeleteModal
            stream={this.state.activeStream}
            onConfirm={(stream) => console.log('YES, PLEASE DELETE!', { stream })}
            onDeny={(stream) => console.log('NO, THANK YOU!', { stream })}
          />
        }
        <Streams
          streams={shapedStreams || []}
          onConfirmToDelete={(stream) => this.onConfirmToDelete(stream)}
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
