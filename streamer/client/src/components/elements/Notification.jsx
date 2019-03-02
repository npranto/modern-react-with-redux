import React, { Component } from 'react';

class Notification extends Component {
  state = {
    autoCloseDuration: 5000,
    showNotification: true,
  }

  componentDidMount() {
    if (this.props.autoClose) {
      this.startAutoCloseTimer();
    }
  }

  startAutoCloseTimer = async () => {
    await setTimeout(() => {
      this.setState({ showNotification: false })
    }, this.props.autoCloseDuration || this.state.autoCloseDuration);
  }

  render() {
    const { type, message, description } = this.props;

    return this.state.showNotification && (
      <div className={`ui ${type} message`}>
        <div className="header">
          <i class="check icon"></i> {message}
        </div>
        <p>{description}</p>
      </div>
    )
  }
}

export default Notification;
