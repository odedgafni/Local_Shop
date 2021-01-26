const Product = require('../models/Product');
const { productValidation } = require('../validation');
const Constants = require('../Constants');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: Constants.success, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ message: Constants.success, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError });
  }
}

const addProduct = async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.json({ message: error.details[0].message })

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    imageUrl: req.body.imageUrl
  })
  try {
    product.save();
    res.json({ message: Constants.success, product })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json({ message: Constants.success, deletedProduct })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: Constants.success, product: updatedProduct })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

const searchProducts = async (req, res) => {
  try {
    const search = new RegExp(`^${req.query.q}`, "i");
    const results = await Product.find({ name: search })
    res.json({ message: Constants.success, results });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProducts
}