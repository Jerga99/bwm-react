import React from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Payment extends React.Component {


  render() {
    return (
      <div className="payment">
        <Elements>
          <CheckoutForm {...this.props}/>
        </Elements>
      </div>
    )
  }
}

export default Payment;
