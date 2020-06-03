import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
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
              <a> Liked: {survey.yes}</a>
              <a>Disliked: {survey.no}</a>
            </div>
          </div>
        );
      });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
