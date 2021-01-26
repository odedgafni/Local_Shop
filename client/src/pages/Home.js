import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import { authHeader } from '../helpers/auth_header'
import { history } from '../helpers/history'
import images from '../Constants/imagesUrl'
import PaginationBar from '../components/PaginationBar'

import { addToCart } from '../redux/actions/cartActions'
import { getCart } from '../redux/actions/cartActions'
import Search from '../components/Search'

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userAuth);

  const productsState = useSelector(state => state.getProducts);
  const { products, loading, error } = productsState;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const IndexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const IndexOfLastItem = itemsPerPage * currentPage;

  const currentProducts = products && products.length > 0 ?
    products.slice(IndexOfFirstItem, IndexOfLastItem) : products;

  const totalPages = Math.ceil(products && products.length / itemsPerPage);
  // 

  useEffect(() => {
    authHeader()
    dispatch(getCart())
  }, [dispatch])

  const handleAddToCart = (product) => {
    if (user) {
      product.qty = 1;
      dispatch(addToCart(product))
    } else {
      history.push('/login')
    }
  }

  return (
    <div className="container">
      <div id="Carousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="Carousel" data-slide-to="0" className="active"></li>
          <li data-target="Carousel" data-slide-to="1" ></li>
          <li data-target="Carousel" data-slide-to="2" ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={images.Carousel_1} alt="First slide" />
          </div>
        </div>
      </div>
      <h1 className="display-2 text-center mb-5">Local Shop</h1>
      <Search />
      {loading &&
        <h2 className="text-center text-muted mt-5">Loading...</h2>}
      {error &&
        <h2 className="text-center text-muted mt-5">{error}</h2>}
      <div className="row mt-5">
        {products && currentProducts.map(product =>
          <Product key={product._id} product={product} handleAddToCart={handleAddToCart}/>)}
      </div>
      <PaginationBar totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <hr className="border"></hr>
      <div className="jumbotron mt-4 border shadow-sm roboto">
        <p>"We here at Local Shop are commited to provide fresh and best quality fruits and vegetables at the cheapest prices.Our team of fresh experts are also dedicated in wholesale distribution to restaurants and cafes across the country."</p>
        <p className="text-center"><i>"The Crew"</i></p>
      </div>
    </div>
  )
}

export default Home
