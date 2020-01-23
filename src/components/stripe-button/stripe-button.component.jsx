import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

function onToken(token) {
  console.log('token success', token);
}

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_M3ujQIOaketWG3O3hiS5fBoD';

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing LLC'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}></StripeCheckout>
  );
};

export default StripeCheckoutButton;
