const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      name: String,
      qty: Number,
      price: Number,
      countInStock: Number,
      imageUrl: String,
      _id: String
    }
  ],
  modifiedOn: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;