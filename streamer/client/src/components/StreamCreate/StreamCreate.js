import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../state/actions/streamsActions';

const Input = ({ label, input, meta }) => {
  return (
    <div className={`field ${(meta && meta.touched && meta.error) ? 'error' : ''}`}>
      <label>{label}</label>
      <input {...input} />
      <ErrorMessage {...meta} />
    </div>
  )
}

const TextArea = ({ label, input, meta }) => {
  return (
    <div className={`field ${(meta && meta.touched && meta.error)  ? 'error' : ''}`}>
      <label>{label}</label>
      <textarea {...input}></textarea>
      <ErrorMessage {...meta} />
    </div>
  )
}

const ErrorMessage = ({ error, touched }) => {
  if (!error) {
    return null;
  }
  return touched && error && (
    <div className="ui pointing red basic label">
      {error}
    </div>
  )
}

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

class StreamCreate extends Component {
  onCreateStreamSubmit = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        console.log(values);
        await this.props.createStream(values);
        this.props.reset();
        resolve();
      }, 2000);
    })
  }

  render() {
    return (
      <div className="StreamCreate">
        {this.props.submitSucceeded &&
          <Notification
            autoClose
            type="positive"
            message="Success!"
            description="Your new stream has been created!"
          />
        }

        {this.props.submitFailed &&
          <Notification
            autoClose
            type="negative"
            message="Oops!"
            description="Let's try again..."
          />
        }

        <div className="ui segment StreamCreate">
          <h2 className="ui header">
            <i className="window maximize icon"></i>
            <div className="content">
              Create Stream
              <div className="sub header">Let's create a new stream</div>
            </div>
          </h2>

          <form onSubmit={this.props.handleSubmit(this.onCreateStreamSubmit)} className={`ui form ${this.props.submitting ? 'loading' : ''}`}>
            <Field component={Input} name="title" type="text" label="Title" />
            <Field component={TextArea} name="description" placeholder="Add description..." label="Description" />
            <button className={`ui button primary ${!this.props.valid ? 'disabled' : ''}`} type="submit">Create</button>
          </form>
        </div>
      </div>
    )
  }
};

const validate = (values) => {
  const errors = {};

  if (values && !values.title)
    errors.title = 'What\'s the name of your stream?';
  if (values && !values.description)
    errors.description = 'Tell us a little about your stream';

  return errors;
}

const CreateStreamForm = reduxForm({
  form: 'createStream',
  validate
})(StreamCreate)

const mapDispatchToProps = {
  createStream
};

export default connect(null, mapDispatchToProps)(CreateStreamForm);
