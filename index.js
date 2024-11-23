const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
});
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let newCartTotal;
  if (isMember) {
    newCartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    newCartTotal = cartTotal;
  }

  res.send(newCartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxAmount = (cartTotal * taxRate) / 100;

  res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let timeTaken;
  if (shippingMethod.toLowerCase() === 'Standard'.toLowerCase()) {
    timeTaken = distance / 50;
  }
  if (shippingMethod.toLowerCase() === 'express'.toLowerCase()) {
    timeTaken = distance / 100;
  }

  res.send(timeTaken.toString());
});
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shipingPrice = weight * distance * 0.1;
  res.send(shipingPrice.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
