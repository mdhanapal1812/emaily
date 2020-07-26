// SurveyField contains logic to render a single
// label and text input
import React from "react";

/**
 * This component represents the fields in the survey.
 * Reusing it in both SurveyForm component and SurveyFormReview.
 * Redux form automatically passes different properties in the input.
 */
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      {/*  ...input is to retain all the properties of input */}
      <input {...input} style={{ marginBottom: "5px", color: "white" }} />
      <div className='red-text' style={{ marginBottom: "20px" }}>
        {/*     If the input box is touched and error is present , then the error is visible under the input field */}
        {touched && error}
      </div>
    </div>
  );
};
