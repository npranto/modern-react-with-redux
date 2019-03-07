import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getStreams, deleteStream } from './../../state/actions/streamsActions';
import { setStreamToEdit } from '../../state/actions/editStreamActions';
import { isStreamCreatedByCurrentUser, getStreamsById } from '../../helpers/streamsHelpers';
import './StreamList.css';

const $ = window.$;

const Streams = (props) => (
  props.streams.map((stream, id) => (
    <Stream key={id} {...stream} {...props} />
  ))
);

class Stream extends Component {
  state = {
    showConfirmStreamDeleteModal: false,
    streamToDelete: null,
  }

  resetModal = () => {
    this.setState({
      showConfirmStreamDeleteModal: false,
      streamToDelete: null,
    })
  }

  onAttemptToDelete = (streamId) => {
    // show the confirm to delete a stream modal
    console.log({ streamId });
    this.setState({
      showConfirmStreamDeleteModal: true,
      streamToDelete: getStreamsById(streamId),
    });
  }

  onApproveToDelete(streamId) {
    console.log('Approving to delete...', { streamId });
    this.resetModal();
    setTimeout(() => {
      this.props.deleteStream(streamId);
    }, 1500)
  }

  onDenyToDelete(streamId) {
    console.log('Denying to delete...', { streamId });
    this.resetModal();
  }

  async onAttemptToEdit(streamId) {
    const streamToEdit = getStreamsById(streamId);
    console.log({ streamToEdit });
    await this.props.setStreamToEdit(streamToEdit);
    this.props.history.push('/streams/edit');
  }

  render() {
    const {
      id,
      title,
      description,
      isEditable,
    } = this.props;

    return (
      <Fragment>
        <ConfirmStreamDeleteModal
          show={this.state.showConfirmStreamDeleteModal}
          stream={this.state.streamToDelete}
          showConfirmStreamDeleteModal={this.state.showConfirmStreamDeleteModal}
          onApproveToDelete={(streamId) => this.onApproveToDelete(streamId)}
          onDenyToDelete={(streamId) => this.onDenyToDelete(streamId)}
        />

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
                    <button class="tiny ui black basic button" onClick={() => this.onAttemptToEdit(id)}>
                      Edit
                    </button>
                    <button class="tiny ui negative basic button" onClick={(e) => this.onAttemptToDelete(id)}>
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

class ConfirmStreamDeleteModal extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      $('body')
        .dimmer({
          // closable: false,
          onChange: () => {
            const { stream } = this.props;
            stream && this.props.onDenyToDelete(stream && stream.id);
          }
        })
        .dimmer('show');
    } else {
      $('body').dimmer('hide');
    }
  }

  render() {
    const {
      show,
      stream,
      onApproveToDelete,
      onDenyToDelete
    } = this.props;

    if (!stream) {
      return null;
    }

    const { id } = stream;
    return (
      <div class={`ui mini modal ${show ? `visible active modal-${id}` : ''}`}>
        <div class="header ">
          Delete Stream
        </div>
        <div class="content">
          <div class="description">
            {/* <div class="ui header">Are you sure you want to delete your account?</div> */}
            <p>Are you sure you want to delete your account?</p>
            {/* <div>
              Title: {title}
            </div> */}
            {/* <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
            <p>Is it okay to use this photo?</p> */}
          </div>
        </div>
        <div class="actions">
          <div class="ui black deny button" onClick={() => onDenyToDelete(id)}>
            No
          </div>
          <div class="ui positive right labeled icon button" onClick={() => onApproveToDelete(id)}>
            Yes
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
    )
  }
}

class StreamList extends Component {
  // state = {
  //   showConfirmStreamDeleteModal: false,
  //   streamToDelete: null,
  // }

  componentDidMount() {
    this.props.getStreams();
  }

  // resetModal = () => {
  //   this.setState({
  //     showConfirmStreamDeleteModal: false,
  //     streamToDelete: null,
  //   })
  // }

  // onAttemptToDelete = (streamId) => {
  //   // show the confirm to delete a stream modal
  //   console.log({ streamId });
  //   this.setState({
  //     showConfirmStreamDeleteModal: true,
  //     streamToDelete: getStreamsById(streamId),
  //   });
  // }

  // onApproveToDelete(streamId) {
  //   console.log('Approving to delete...', { streamId });
  //   this.resetModal();
  // }

  // onDenyToDelete(streamId) {
  //   console.log('Denying to delete...', { streamId });
  //   this.resetModal();
  // }

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

        {/* <ConfirmStreamDeleteModal
          stream={this.state.streamToDelete}
          showConfirmStreamDeleteModal={this.state.showConfirmStreamDeleteModal}
          onApproveToDelete={(streamId) => this.onApproveToDelete(streamId)}
          onDenyToDelete={(streamId) => this.onDenyToDelete(streamId)}
        /> */}

        <Streams
          {...this.props}
          streams={enhancedStreams || []}
          // showConfirmStreamDeleteModal={this.state.showConfirmStreamDeleteModal}
          // onAttemptToDelete={(streamId) => this.onAttemptToDelete(streamId)}
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
  setStreamToEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
