// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

/**
 * This component is used to create a new Survey
 */
class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    /**
     * Based on whether the user wants to enter the form informaiton or review the form , 
     * The corresponding components are rendered.
     */
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <section class='page-section' id='services'>
        <div className='container'>{this.renderContent()}</div>
      </section>
    );
  }
}


/**
 * Wiring up the surveyForm to surveyNew 
 * in order to dump the form values when the user clicks cancel button (otherwise it will be persisting)
 */
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
