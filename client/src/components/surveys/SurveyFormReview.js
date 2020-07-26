// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

/**
 * This component is used to allow the user to review the form.
 * OnCancel is passed from parent , formValues is taken from store,
 */
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  /**
   * Displaying the contents of the form along with its values , for user to review.
   */
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label style={{ color: "white" }}>{label}</label>
        <div style={{ color: "white" }}>{formValues[name]}</div>
      </div>
    );
  });

  /**
   * on clicking submit  , the submitSurvey API is called to store the survey to the backend
   */
  return (
    <section class='page-section' id='services' style={{ background: "black" }}>
      <div className='container' style={{ background: "black" }}>
        <h5 style={{ color: "white" }}>Please confirm your entries</h5>
        {reviewFields}
        <button
          className='yellow darken-3 white-text btn-flat'
          onClick={onCancel}
        >
          Back
        </button>
        <button
          onClick={() => submitSurvey(formValues, history)}
          className='green btn-flat right white-text'
        >
          Send Survey
        </button>
      </div>
    </section>
  );
};

/**
 * To pull the form values entered by the user from redux-form store.
 */
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

/**
 * withRouter is used to get access to history , so that 
 * after the submit , user can be redirected.
 * So after a response is received from submitSurvey action creator , 
 * it will redirect to dashboard.
 */
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
