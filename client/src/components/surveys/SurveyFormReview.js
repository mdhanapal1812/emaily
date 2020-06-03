// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label style={{ color: "white" }}>{label}</label>
        <div style={{ color: "white" }}>{formValues[name]}</div>
      </div>
    );
  });

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
          <i className='material-icons right'>email</i>
        </button>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
