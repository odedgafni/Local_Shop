import * as actionTypes from '../Constants/cartConstants'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_CART_REQUSET:
      return {
        loading: true,
        cart: {}
      }
    case actionTypes.GET_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload
      }
    case actionTypes.GET_CART_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.ADD_TO_CART_REQUEST:
      return {
        loading: true,
        cart: {...state.cart}
      }
    case actionTypes.ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload
      }
    case actionTypes.ADD_TO_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
        cart: {...state.cart}
      }
    case actionTypes.REMOVE_FROM_CART_REQUEST:
      return {
        loading: true,
        cart: {...state.cart}
      }
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload
      }
    case actionTypes.REMOVE_FROM_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
        cart: {...state.cart}
      }
    case actionTypes.ADJUST_QTY_REQUEST:
      return {
        loading: true,
        cart: {...state.cart}
      }
    case actionTypes.ADJUST_QTY_SUCCESS:
      return {
        loading: false,
        cart: action.payload
      }
    case actionTypes.ADJUST_QTY_FAIL:
      return {
        loading: false,
        error: action.payload,
        cart: {...state.cart}
      }
    case actionTypes.DELETE_CART_SUCCESS:
      return {
        cart: {}
      }
    case actionTypes.DELETE_CART_FAIL:
      return {
        error: action.payload
      }
    default:
      return state;
  }
}