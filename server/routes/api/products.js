const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  addProduct, 
  deleteProduct,
  updateProduct,
  searchProducts
} = require('../../controllers/productController')

const router = express.Router();

//@desc  Search products by query 
//@route UPDATE /api/products
//@access PUBLIC
router.get('/search', searchProducts);

//@desc Get all products from db
//@route GET /api/products
//@access PUBLIC
router.get('/', getAllProducts);

//@desc Get a product by id from db
//@route GET /api/products/:id
//@access PUBLIC
router.get('/:id', getProductById);

//@desc  Add new product to db
//@route POST /api/products
//@access PUBLIC
router.post('/', addProduct);

//@desc  Delete a product by id from db
//@route DELETE /api/products/:id
//@access PUBLIC
router.delete('/:id', deleteProduct);

//@desc  Update a product by id 
//@route PUT /api/products/:id
//@access PUBLIC
router.put('/:id', updateProduct);



module.exports = router;