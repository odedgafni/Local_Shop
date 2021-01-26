const express = require('express');
const verifyToken = require('../../verifyToken')
const { getCart, addToCart, removeFromCart, adjustQty, deleteCart } = require('../../controllers/cartController')

const router = express.Router();

//@desc Get cart from db
//@route GET /api/cart
//@access /w token
router.get('/', verifyToken, getCart)

//@desc Add product to cart 
//@route POST /api/cart/add_to_cart
//@access /w token
router.post('/add_to_cart', verifyToken, addToCart)

//@desc Remove product from cart 
//@route POST /api/cart/remove_from_cart
//@access /w token
router.post('/remove_from_cart', verifyToken, removeFromCart)

//@desc Adjust product qty 
//@route POST /api/cart/adjust_qty
//@access /w token
router.post('/adjust_qty', verifyToken, adjustQty)

//@desc Delete cart from db
//@route DELETE /api/cart
//@access /w token
router.delete('/', verifyToken, deleteCart)

module.exports = router;