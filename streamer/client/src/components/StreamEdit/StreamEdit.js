import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream, updateStream } from '../../state/actions/streamsActions';
import { resetStreamToEdit  } from '../../state/actions/editStreamActions';
import { withFormik } from 'formik';

class StreamEdit extends Component {

  onCancelToEdit = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      handleSubmit,
      isSubmitting,
      handleChange,
      handleBlur,
      values,
      errors,
      touched,
      // status
    } = this.props;

    console.log({ currentProps: this.props });

    return (
      <div className="StreamEdit">
        <div className="ui segment StreamEdit">
          <h2 className="ui header">
            <i className="window maximize icon"></i>
            <div className="content">
              Edit Stream
              <div className="sub header">Feel free to update your stream</div>
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

            {/* <button className={`ui button primary ${isSubmitting ? 'disabled' : ''}`} type="submit">
              Update
            </button> */}
            <div className="ui buttons">
              <button className="ui button" onClick={() => this.onCancelToEdit()}>Cancel</button>
              <div className="or"></div>
              <button className="ui positive button">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ editStream }) => {
  return {
    editStream,
  }
}

const mapDispatchToProps = {
  createStream,
  updateStream,
  resetStreamToEdit,
};

const WithFormikStreamEdit = withFormik({
  enableReinitialize: true,

  mapPropsToValues: ({ editStream }) => ({
    title: editStream.stream ? editStream.stream.title : '',
    description: editStream.stream ? editStream.stream.description : ''
  }),

  // Custom sync validation
  validate: (values, props) => {
    const errors = {};
    if (values && !values.title)
      errors.title = 'What\'s the name of your stream?';
    if (values && !values.description)
      errors.description = 'Tell us a little about your stream';
    return errors;
  },

  handleSubmit: (values, { setSubmitting, resetForm, setStatus, props }) => {
    console.log(values);
    console.log({ props });
    const editedStream = props.editStream && props.editStream.stream;
    setTimeout(async () => {
      await props.updateStream(editedStream.id, { ...editedStream, ...values });
      setSubmitting(false);
      setStatus('positive');
      props.resetStreamToEdit();
      props.history.push('/');
    }, 1000);
  },

  displayName: 'editStream',
})(StreamEdit);

export default connect(mapStateToProps, mapDispatchToProps)(WithFormikStreamEdit);
