import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payment extends React.Component{
    render() {
        debugger;
        return (
            <StripeCheckout name = "Emaily" description="Pay  5$ for 5 emails" amount={500}
                            token={token => this.props.handleToken(token)}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className="btn">
                    Add credits
                </button>
            </StripeCheckout>
        )
    }
}

/** Note here we want to access only the action creator so we are just giving null and giving actions
 * and using the handleToken action creator.
 */

export default connect(null,actions)(Payment);