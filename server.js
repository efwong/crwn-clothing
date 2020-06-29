const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  /**
   * Tells app to use express.static middleware
   * static: servers file given by the path ./client/build
   */
  app.use(express.static(path.join(__dirname, 'client/build')));

  /**
   * Get request: For any route not covered (catchall)
   */
  app.get('*', function (req, res) {
    /**
     * Sendback index.html file in client/build directory
     */
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

/**
 * Listen to /payment post request
 */
app.post('/payment', (req, res) => {
  console.log('req', req);
  if (req && req.body) {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };
    console.log('body', body);

    stripe.charges.create(body, (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log('error', stripeErr);
        res.status(500).send({ error: stripeErr });
      } else {
        console.log('success', stripeRes);
        res.status(200).send({ success: stripeRes });
      }
    });
  } else {
    res.status(500).send({ error: 'Invalid stripe request' });
  }
});
