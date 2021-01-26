import './App.css';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home'
import Cart from './pages/Cart';
import Login from './pages/Login';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import UserInfo from './pages/UserInfo';
import { Register } from './pages/Register';
import { history } from './helpers/history';
import { authHeader } from './helpers/auth_header'

import { getUser } from './redux/actions/userActions'
import { getCart } from './redux/actions/cartActions'
import { getProducts } from './redux/actions/productActions'

import { useDispatch } from 'react-redux'
import UserUpdate from './pages/UserUpdate';
import RecentOrders from './pages/RecentOrders';
import ProductPage from './pages/ProductPage';
import PageNotFound from './pages/PageNotFound';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authHeader()
    dispatch(getUser())
    dispatch(getCart())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Router history={history}>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/user/info">
            <UserInfo />
          </Route>
          <Route exact path="/user/update">
            <UserUpdate />
          </Route>
          <Route exact path="/user/recent_orders">
            <RecentOrders />
          </Route>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/:any">
            <PageNotFound />
          </Route>
        </Switch>
        <hr className="mt-5" />
        <Footer />
      </Router>
    </BrowserRouter>
  );
}

export default App;
