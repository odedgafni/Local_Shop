import { combineReducers } from 'redux'
import { productsReducer, searchProductReducer } from './reducers/productReducers'
import { singleProductReducer } from './reducers/singleProductReducer'
import { authReducer } from './reducers/authReducer'
import { registerReducer } from './reducers/registerReducer'
import { cartReducer } from './reducers/cartReducer'

const rootReducer = combineReducers({
  getProducts: productsReducer,
  singleProduct: singleProductReducer,
  searchProducts: searchProductReducer,
  userRegister: registerReducer,
  userAuth: authReducer,
  shoppingCart: cartReducer
})

export default rootReducer;