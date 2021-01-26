import * as actionTypes from '../Constants/cartConstants'
import Constants from '../../Constants/globalConstants'
import { handleError } from '../../helpers/handleError'
import { calcTotalCart } from '../../helpers/cartCalc'
import axios from 'axios'

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CART_REQUSET });

    const { data } = await axios.get('/api/cart');

    if (data.message === Constants.Success) {
      // Calculating total cart
      const totalCart = calcTotalCart(data.cart.products)
      // Pushing it back to the cart
      data.cart.totalCart = totalCart;
      dispatch({
        type: actionTypes.GET_CART_SUCCESS,
        payload: data.cart
      })
    } else {
      dispatch({
        type: actionTypes.GET_CART_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_CART_FAIL,
      payload: handleError(err)
    })
  }
}

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_TO_CART_REQUEST });

    const { data } = await axios.post('/api/cart/add_to_cart', product);

    if (data.message === Constants.Success) {
      // Calculating total cart
      const totalCart = calcTotalCart(data.cart.products)
      // Pushing it back to the cart
      data.cart.totalCart = totalCart;
      dispatch({
        type: actionTypes.ADD_TO_CART_SUCCESS,
        payload: data.cart
      })
    } else {
      dispatch({
        type: actionTypes.ADD_TO_CART_FAIL,
        payload: data
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.ADD_TO_CART_FAIL,
      payload: handleError(err)
    })
  }
}

export const removeFromCart = (_id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART_REQUEST });
    console.log(_id)
    const { data } = await axios.post('/api/cart/remove_from_cart', { _id });

    if (data.message === Constants.Success) {
      // Calculating total cart
      const totalCart = calcTotalCart(data.cart.products)
      // Pushing it back to the cart
      data.cart.totalCart = totalCart;
      dispatch({
        type: actionTypes.REMOVE_FROM_CART_SUCCESS,
        payload: data.cart
      })
    } else {
      dispatch({
        type: actionTypes.REMOVE_FROM_CART_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_FAIL,
      payload: handleError(err)
    })
  }
}

export const adjustQty = (qty, _id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART_REQUEST });

    const { data } = await axios.post('/api/cart/adjust_qty', { qty, _id });

    if (data.message === Constants.Success) {
      // Calculating total cart
      const totalCart = calcTotalCart(data.cart.products)
      // Pushing it back to the cart
      data.cart.totalCart = totalCart;
      dispatch({
        type: actionTypes.ADJUST_QTY_SUCCESS,
        payload: data.cart
      })
    } else {
      dispatch({
        type: actionTypes.ADJUST_QTY_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.ADJUST_QTY_FAIL,
      payload: handleError(err)
    })
  }
}

export const deleteCart = () => async (dispatch) => {
  try {
    const { data } = await axios.delete('/api/cart');

    if (data.message === Constants.Success) {
      dispatch({ type: actionTypes.DELETE_CART_SUCCESS })
    } else {
      dispatch({
        type: actionTypes.DELETE_CART_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.DELETE_CART_FAIL,
      payload: handleError(err)
    })
  }



}