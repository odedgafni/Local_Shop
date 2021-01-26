import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {adjustQty, removeFromCart} from '../redux/actions/cartActions'

const CartProduct = ({ product }) => {

  const [qty, setQty] = useState(product.qty);

  const dispatch = useDispatch();

  const totalPrice = product.price * product.qty;

  const handleAdjustQty = (e, qty, _id) => {
    e.preventDefault();
    dispatch(adjustQty(qty, _id))
    setQty(qty);
  }

  const handleRemoveFromCart = (e, _id) => {
    e.preventDefault();
    dispatch(removeFromCart(_id));
  }
  return (
    <div className="row justify-content-center align-items-center text-center">
      <hr className="w-100" />
      <div className="col">
        <div className="position-relative">
          <p className="p-0 m-0"><b>{product.name}</b></p>
          <img className="img-fluid cart-img" src={product.imageUrl} alt="img" />
        </div>
      </div>
      <div className="col">
        ${product.price}
      </div>
      <div className="col">
        <select className="form-control" type="number" value={qty} onChange={(e) => handleAdjustQty(e, e.target.value, product._id)}>
          {[...Array(product.countInStock).keys()].map(val => 
            <option key={val} value={val+1}>{val+1}</option>)}
        </select>
      </div>
      <div className="col">
        Total: <b>${totalPrice.toFixed(2)}</b>
      </div>
      <div className="col-xs-12 col-md">
        <button className="btn btn-warning" onClick={(e) => handleRemoveFromCart(e, product._id)}>
          <i className="fas fa-trash-alt"></i> Remove</button>
      </div>
    </div>
  )
}

export default CartProduct
