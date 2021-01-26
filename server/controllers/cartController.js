const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Constants = require('../Constants');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json({ message: Constants.success, cart })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const addToCart = async (req, res) => {
  const { qty, _id } = req.body;
  try {
    const product = await Product.findById(_id);
    // Check if the product is in stock
    if (product.countInStock < qty){
      return res.json({message: Constants.outOfStock, _id})
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      // cart found, check if the product is in the cart already
      const productInCart = cart.products.find(product => product._id === _id);
      if (productInCart) {
        // product found in the cart, check if there are enough in stock
        if(productInCart.qty + qty > product.countInStock){
          return res.json({message: Constants.outOfStock_2, _id})
        } else 
        productInCart.qty += qty;
      } else {
        // product not found, push new one
        cart.products.push(req.body);
      }
      // save the cart after adjusments
      const savedCart = await cart.save();
      return res.json({ message: Constants.success, cart: savedCart })
    } else {
      // cart not found, create a new one
      const newCart = await Cart.create({
        userId: req.user.id,
        products: [req.body]
      })
      return res.json({ message: Constants.success, cart: newCart })
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const removeFromCart = async (req, res) => {
  const { _id } = req.body
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    // check for the wanted product and remove
    const productIndex = cart.products.findIndex(product => product._id === _id)
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      const savedCart = await cart.save();
      res.json({ message: Constants.success, cart: savedCart })
    } else {
      res.status(500).json({ message: Constants.serverError });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const adjustQty = async (req, res) => {
  const { qty, _id } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const product = cart.products.find(product => product._id === _id);

    product.qty = qty;
    const savedCart = await cart.save();
    res.json({ message: Constants.success, cart: savedCart })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({message: Constants.success, cart})
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  adjustQty,
  deleteCart
}