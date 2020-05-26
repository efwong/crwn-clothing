import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import { stripePublishableKey } from './stripe.config';

const onToken = (token) => {
  // use code here to proccess charge with token on our backend
  console.log(token);
  console.log('Payment Success');
};

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
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
