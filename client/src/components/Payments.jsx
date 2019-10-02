import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions';
import { connect } from 'react-redux';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name='Maily'
        description='$5 for 5 email credits'
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PK}>
        <button className='btn'>ADD CREDITS </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleToken }
)(Payments);
