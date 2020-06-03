import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import Header from "./Header";
import DashBoard from "./DashBoard";
import SurveyNew from "./surveys/SurveyNew";

/* This is how we can connect a component with an action creator */
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />

          <Route path='/' exact component={Landing} />
          <Route path='/surveys' exact component={DashBoard} />
          <Route path='/surveys/new' exact component={SurveyNew} />
        </BrowserRouter>
      </div>
    );
  }
}

//Connect is how the components and action creaters are tied up. We need to pass the actions that
//we need as 2nd arguments.
//Once we pass the actions , they are assigned to the App component and we could use them inside our class using props
export default connect(null, actions)(App);
