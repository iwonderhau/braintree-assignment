const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'p87g3wg67bqn9dc7',
    publicKey: 'qs5dd5hdtr8nr4wz',
    privateKey: '81a9d1d00cf13e95f933c03536bc8297',
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;

  // get the amount to transact
  const payamount = req.body.amount;

  // Create a new transaction
  const newTransaction = gateway.transaction.sale(
    {
      amount: payamount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = router;
