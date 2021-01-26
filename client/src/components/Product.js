import React from 'react'
import { history } from '../helpers/history'

import { useSelector } from 'react-redux'

const Product = ({ product, handleAddToCart }) => {

  const { error } = useSelector(state => state.shoppingCart);

  const shortDesc = product.description.substring(0, 75);

  const handleProductClick = () => {
    history.push(`/product/${product._id}`)
  }

  return (
    <div className="col-sm-6 col-md-6 col-lg-3 p-2" key={product._id}>
      <div className="card shadow-sm">
        <div className="card-body border">
          <h2 className="card-title">{product.name}</h2>
          <img src={product.imageUrl} alt="" className="card-img"
            onClick={() => handleProductClick()} />
          <h4 className="card-text text-muted">{product.price}$</h4>
          <p className="card-text roboto"><i>{shortDesc}...</i></p>
          {error && error._id === product._id &&
            <p className="text-danger">{error.message}</p>
          }
          <button className="btn btn-primary"
            onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product
