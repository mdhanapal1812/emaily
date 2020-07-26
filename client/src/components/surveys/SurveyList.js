import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

/**
 * This component is used to display the survey contents to user.
 */
class SurveyList extends React.Component {

  /**
   * Fetching the surveys as soon as the component is mounted.
   */
  componentDidMount() {
    this.props.fetchSurveys();
  }

  /**
   * For every survey , displaying it in the following styling.
   */
  renderSurveys() {
    return this.props.surveys
      .reverse()
      .map((survey) => {
        return (
          <div className='card darken-1' key={survey._id}>
            <div className='card-content'>
              <span className='card-title'> Title : {survey.title}</span>
              <p>Content : {survey.body}</p>
              <p className='right'>
                Date sent: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className='card-action'>
              <a> Likes: {survey.yes}</a>
              <a>Dislikes: {survey.no}</a>
            </div>
          </div>
        );
      });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

/**
 * Allows us to access the survey store.
 */
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
