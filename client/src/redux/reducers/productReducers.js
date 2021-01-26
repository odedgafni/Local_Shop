import * as actionTypes from '../Constants/productConstants'
import Constants from '../../Constants/globalConstants'

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.SET_PRODUCTS:
      return {
        loading: false,
        products: action.payload
      }
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        update: Constants.Success
      }
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        update: action.payload
      }
    default:
      return state
  }
}
export const searchProductReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        results: action.payload
      }
    case actionTypes.GET_SEARCH_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
