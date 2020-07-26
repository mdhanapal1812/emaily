// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

/**
 * This component contains the survey form for user to enter the survey information.
 */
class SurveyForm extends Component {

  renderFields() {

    /**
     * Redux form contains the name and its value after we click submit.
     * For every form field , use the Field component available in redux form
     * to display the fields and its text box
     */
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      );
    });
  }

  /**
   * On clicking the survey submit , the form review screen would be displayed
   * for users to validate.
   */
  render() {
    return (
      <section
        class='page-section'
        id='services'
        style={{ background: "black" }}
      >
        <div className='container'>
          {/*      props.handleSubmit , is provided to us from redux Forms. 
          onSurveySubmit is present in the parent Component (redirects to show the Form review)
          */}
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
            {this.renderFields()}
            <Link to='/surveys' className='red btn-flat white-text'>
              Cancel
            </Link>
            <button type='submit' className='teal btn-flat right white-text'>
              Next
            </button>
          </form>
        </div>
      </section>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

/**
 * /**
 * Wiring up the component with redux form.
 * Form name is surveyForm , which will contain the form.values properties.
 * Validate will be called everytime the user submits the form.
 * In order to persist the values , if the user clicks back button during form review
 * to correct the values. So we are using destroyOnUnmount:false
 */
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
