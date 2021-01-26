const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { v4: uuid } = require('uuid');
const Constants = require('../../Constants')
const verifyToken = require('../../verifyToken')

const router = express.Router();


//@desc Stripe Checkout 
//@route POST /api/checkout
//@access /w token
router.post('/', verifyToken, async (req, res) => {
  try {
    const { token, cart, totalCartPrice } = req.body

    const items = cart.products.map(item =>
      `x${item.qty} ${item.name}\n` 
    )

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: Math.round(totalCartPrice * 100),
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Receipt for buying in Local Shop:
        ${items}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge Success");
    res.json({message: Constants.success, charge});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
})

module.exports = router;