import React, { useEffect, useState } from 'react'
import { history } from '../helpers/history'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'

import { useSelector, useDispatch } from 'react-redux'

const ProductPage = () => {

  const { product, loading } = useSelector(state => state.singleProduct)
  const { user } = useSelector(state => state.userAuth);
  const { error } = useSelector(state => state.shoppingCart);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [qty, setQty] = useState(1);

  const handleAddToCart = (product) => {
    if (user) {
      product.qty = qty;
      dispatch(addToCart(product))
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [])

  return (
    <div className="container mt-5">
      {product ?
        <div>
          <br />
          <div className="shadow mt-5">
            <a href="/" className="position-absolute btn btn-info m-2 shadow-sm">
              <i className="fas fa-undo-alt"></i>
            </a>
            <div className="card-body">
              <h1 className="display-4 text-center">{product.name}</h1>
              <div className="row justify-content-around mt-4 p-3">
                <div className="col col-md-4">
                  <img className="mb-2 ml-4 cart-img2" src={product.imageUrl} alt="" />
                </div>
                <div className="col col-md-8">
                  <p className="">{product.description}</p>
                  <h4 className="card-text text-muted">{product.price}$</h4>
                  <p className="text-muted">Count in stock: {product.countInStock}</p>
                </div>
              </div>
              <div className="row justify-content-end pb-2">
                <div className="col-4 col-lg-2">
                  <select className="form-control" type="number" value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map(val =>
                      <option key={val} value={val + 1}>{val + 1}</option>)}
                  </select>
                </div>
                <div className="col-4">
                  {error &&
                    <p className="text-danger">{error.message}</p>
                  }
                  <button className="btn btn-success"
                    onClick={() => handleAddToCart(product)}>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        loading &&
        <div className="container mt-5 mb-5">
          <br />
          <h1 className="display-4 text-muted text-center mt-5 mb-5">Loading...</h1>
          <br />
        </div>
      }
    </div>
  )
}

export default ProductPage
