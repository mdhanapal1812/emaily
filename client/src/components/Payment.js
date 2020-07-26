import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

/**
 * This component is responsible for displaying the payment pop-up screen.
 * After the user enters the details and click Add credits , 
 * This component sends the token to backend API through the action creator 
 * called handleToken (Backend will verify and 
 * update the credits information for this user.)
 */
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name='FeedbackStore'
        description='$5 for 5 email credits'
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

/**
 * Here mapStateToProps is not necessary , we only call the action creator in this component.
 */
export default connect(null, actions)(Payments);
