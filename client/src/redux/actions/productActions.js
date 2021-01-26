import * as actionTypes from '../Constants/productConstants'
import Constants from '../../Constants/globalConstants'
import { handleError } from '../../helpers/handleError'
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const { data } = await axios.get('/api/products')

    if (data.message === Constants.Success) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: data.products
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload: handleError(err)
    })
  }
}

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`)

    if (data.message === Constants.Success) {
      dispatch({
        type: actionTypes.GET_SINGLE_PRODUCT_SUCCESS,
        payload: data.product
      });
    } else {
      dispatch({
        type: actionTypes.GET_SINGLE_PRODUCT_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_SINGLE_PRODUCT_FAIL,
      payload: handleError(err)
    })
  }
}

export const searchProducts = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/search?q=${query}`)

    if (data.message === Constants.Success) {
      dispatch({
        type: actionTypes.GET_SEARCH_PRODUCTS_SUCCESS,
        payload: data.results
      });
    } else {
      dispatch({
        type: actionTypes.GET_SEARCH_PRODUCTS_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_SEARCH_PRODUCTS_FAIL,
      payload: handleError(err)
    })
  }
}

export const setProducts = (products) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_PRODUCTS,
    payload: products
  })
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product)

    if (data.message === Constants.Success) {
      dispatch({ type: actionTypes.UPDATE_PRODUCT_SUCCESS });
    } else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        payload: data.message
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_FAIL,
      payload: handleError(err)
    });
  }

}