import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const Input = ({ label, input, meta }) => {
  console.log(meta);
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
    <div class="ui pointing red basic label">
      {error}
    </div>
  )
}

class StreamCreate extends Component {
  onCreateStreamSubmit(values) {
    console.log(values);
  }

  render() {
    console.log(this.props);
    return (
      <div className="ui segment StreamCreate">
        <h2 className="ui header">
          <i className="window maximize icon"></i>
          <div className="content">
            Create Stream
            <div className="sub header">Let's create a new stream</div>
          </div>
        </h2>

        <form onSubmit={this.props.handleSubmit(this.onCreateStreamSubmit)} className="ui form">
          <Field component={Input} name="title" type="text" label="Title" />
          <Field component={TextArea} name="description" placeholder="Add description..." label="Description" />
          <button className={`ui button primary ${!this.props.valid ? 'disabled' : ''}`} type="submit">Create</button>
        </form>
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

export default reduxForm({
  form: 'createStream',
  validate
})(StreamCreate);
