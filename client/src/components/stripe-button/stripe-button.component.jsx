import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';
import { stripePublishableKey } from './stripe.config';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;

  const onToken = (token) => {
    // use code here to proccess charge with token on our backend
    console.log(token);
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then((response) => {
        console.log('Payment Successful');
      })
      .catch((error) => {
        console.error('Payment error', error);
        alert(
          'There was an issue with your payment. Please verify your provided credit card.'
        );
      });
  };
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={stripePublishableKey}
    />
  );
};

export default StripeCheckoutButton;
