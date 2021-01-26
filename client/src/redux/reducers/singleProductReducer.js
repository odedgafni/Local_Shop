import * as actionTypes from '../Constants/productConstants'

export const singleProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_SINGLE_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case actionTypes.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    case actionTypes.GET_SINGLE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}