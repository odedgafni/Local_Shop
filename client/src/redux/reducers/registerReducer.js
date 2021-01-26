import * as actionTypes from '../Constants/userConstants'
import Constants from '../../Constants/globalConstants'

export const registerReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        message: Constants.Loading,
        display: "muted"
      }
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        message: Constants.Success,
      }
    case  actionTypes.USER_REGISTER_FAIL:
      return {
        message: action.payload,
        display: "danger"
      }
    default:
      return state;
  }
}