import React, { Component } from 'react';

const $ = window.$;

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
          <div className="ui negative button" onClick={() => this.props.stream && this.onDeny(this.props.stream.id)}>
            No
          </div>
          <div className="ui positive right labeled icon button" onClick={() => this.props.stream && this.onConfirm(this.props.stream.id)}>
            Yes
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmStreamDeleteModal;
