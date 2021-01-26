import Constants from '../../Constants/globalConstants'
import * as actionTypes from '../Constants/userConstants'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        isLogged: false
      }
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        isLogged: true,
        user: action.payload
      }
    case actionTypes.USER_LOGIN_FAIL:
      return {
        isLogged: false,
        error: action.payload
      }
    case actionTypes.GET_USER_REQUEST:
      return {
        loading: true
      }
    case actionTypes.GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload
      }
    case actionTypes.GET_USER_FAIL:
      return {
        loading: false,
        tokenError: action.payload
      }
    case actionTypes.UPDATE_USER_REQUEST:
      return {
        loading: true,
      }
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        loading: false,
        update: Constants.Success,
        user: action.payload
      }
    case actionTypes.UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.USER_LOGOUT:
      return {
        isLogged: false,
        user: {}
      }
    default:
      return state;
  }
}



