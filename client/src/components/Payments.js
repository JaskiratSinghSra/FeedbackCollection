import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description=" Dollar 5 for 5 emails"
        amount={500} // By default US cents
        token={token => this.props.handleToken(token)} //Calling action creator
        // token we receice from stripe,objetct representing the entire charge
        stripeKey={process.env.REACT_APP_STRIPE_KEY} // Value injected on create react app
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
