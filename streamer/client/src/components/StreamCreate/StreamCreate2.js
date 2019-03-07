import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../state/actions/streamsActions';
import { Formik, withFormik } from 'formik';
import Notification from './../elements/Notification';

const StreamCreate2 = (props) => {
  const {
    handleSubmit,
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    // status
  } = props;
  return (
    <div className="StreamCreate">
      <div className="ui segment StreamCreate">
        <h2 className="ui header">
          <i className="window maximize icon"></i>
          <div className="content">
            Create Stream
            <div className="sub header">Let's create a new stream</div>
          </div>
        </h2>

        <form onSubmit={handleSubmit} className={`ui form ${isSubmitting ? 'loading' : ''}`}>
          <div className={`field`}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {errors.title && touched.title && (
              <div className="ui pointing red basic label">
                {errors.title}
              </div>
            )}
          </div>


          <div className={`field`}>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            ></textarea>
            {errors.description && touched.description && (
              <div className="ui pointing red basic label">
                {errors.description}
              </div>
            )}
          </div>

          <button className={`ui button primary ${isSubmitting ? 'disabled' : ''}`} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  createStream
};

const WithFormikStreamCreate2 = withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: ''
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};
    if (values && !values.title)
      errors.title = 'What\'s the name of your stream?';
    if (values && !values.description)
      errors.description = 'Tell us a little about your stream';
    return errors;
  },

  handleSubmit: (values, { setSubmitting, resetForm, setStatus, props }) => {
    console.log(values);
    console.log(props);
    setTimeout(async () => {
      await props.createStream(values);
      setSubmitting(false);
      resetForm();
      setStatus('positive');
    }, 1000);
  },

  displayName: 'createStream',
})(StreamCreate2);

export default connect(null, mapDispatchToProps)(WithFormikStreamCreate2);
