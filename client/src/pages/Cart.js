import React from 'react'
import Constants from '../Constants/globalConstants'
import images from '../Constants/imagesUrl'
import CartProduct from '../components/CartProduct'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { updateRequest } from '../redux/actions/userActions'
import { deleteCart } from '../redux/actions/cartActions'
import { updateProduct } from '../redux/actions/productActions'

const Cart = () => {

  const { cart, loading } = useSelector(state => state.shoppingCart)

  const { user } = useSelector(state => state.userAuth)

  const dispatch = useDispatch()

  const handleStripeToken = async (token) => {
    const totalPrice = Number(cart.totalCart.totalPrice).toFixed(2)
    const { data } = await axios.post('/api/checkout', {
      token,
      cart,
      totalCartPrice: totalPrice
    })
    if (data.message === Constants.Success) {
      // Add order to user's recent orders
      cart.charge = data.charge
      dispatch(updateRequest({
        recentOrders: user.recentOrders ? [...user.recentOrders, cart]
          : cart
      }))
      // Delete the cart
      dispatch(deleteCart())

      // Adjust count in stock for each item
      cart.products.map(product => {
        const countInStock = product.countInStock - product.qty
        return dispatch(updateProduct({ _id: product._id, countInStock }))
      })

    } else {
      alert(Constants.checkout_Error)
    }
  }

  return (
    <div className="container-fluid">
      <br />
      <h1 className="mt-5 mb-5 text-center display-3">Shopping Cart</h1>
      {!cart || !cart.totalCart ?
        loading ?
          <div>
            <h3 className="mt-5 mb-5 text-center text-muted">Loading...</h3>
          </div>
          :
          <div className="text-center">
            <h5>Your Cart is Empty...</h5>
            <img className="cart-img2" src={images.Cart_1} alt="" />
            <br />
            <a href="/" className="btn btn-primary shadow">Continue browsing</a>
          </div>
        :
        <div className="row">
          <div className="col col-lg-8 col-12">
            <div className="card shadow p-4">
              <div className="card-body">
                <h4 className="mb-3">Cart (<b>{cart.totalCart.totalQty}</b> Items)</h4>
                {cart.products.map(product =>
                  <CartProduct key={product._id} product={product} />
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow p-2">
              <div className="card-body">
                <h3 className="mb-4">Order Total:</h3>
                <div>
                  <div><b>Cart Total Amount:</b>
                    <div className="float-right"> ${cart.totalCart.totalPrice}</div>
                  </div>
                  <div><b>Shipping:</b>
                    <div className="float-right">Free</div>
                  </div>
                </div>
                <hr />
                <div><b>Total Amount:</b>
                  <h5 className="float-right text-muted">${cart.totalCart.totalPrice}</h5>
                </div>
                <StripeCheckout className="mt-3 "
                  stripeKey={Constants.stripe_Key}
                  token={handleStripeToken}
                  billingAddress
                  shippingAddress
                  amount={cart.totalCart.totalPrice * 100}
                />
              </div>
            </div>
            <div className="card shadow mt-2">
              <div className="card-body">
                <a className="text-muted discount d-flex justify-content-between collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Add a discount code (optional)
                  <span><i className="fas fa-chevron-down pt-1"></i></span>
                </a>
                <div className="collapse" id="collapseExample">
                  <div className="mt-3">
                    <div className="md-form md-outline mb-0">
                      <input type="text" id="discount-code" className="form-control font-weight-light" placeholder="Enter discount code" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default Cart
