import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

/**
 * This component allows the user to view the surveys collected so far.
 * Also , provides the option for the user to create a new survey.
 */
class DashBoard extends React.Component {
  render() {
    return (
      <section
        class='page-section'
        id='services'
        style={{ background: "black" }}
      >
        <div className='container'>
          <h4
            style={{
              color: "white",
              textAlign: "center",
              font: "Lucida Console",
            }}
          >
            List of surveys created and their responses
          </h4>
          <SurveyList />
          <div className='fixed-action-btn'>
            <Link to='/surveys/new' className='red btn-flat white-text'>
              Create New Survey
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default DashBoard;
