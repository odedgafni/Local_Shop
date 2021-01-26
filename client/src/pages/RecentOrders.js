import React from 'react'

import { useSelector } from 'react-redux'

const RecentOrders = () => {

  const { user, loading } = useSelector(state => state.userAuth)
  const recentOrders = user && user.recentOrders;

  return (
    <div className="mt-5">
      <h1 className="jumbotron bg-light shadow text-center display-4">RecentOrders</h1>
      {
        recentOrders ?
          <div className="container mt-3">
            <div className="row justify-content-center">
              {recentOrders.map((order, i) =>
                <div className="card col-12 mx-2 shadow mb-3" key={order._id}>
                  <div className="card-body row">
                    <div className="col-12">
                      <h2 className="card-title text-muted text-center">Order {i + 1}</h2>
                      <h5><a href={order.charge.receipt_url}>Receipt</a></h5>
                      <p>Date: {order.modifiedOn.substring(0, 10)}</p>
                    </div>
                    <div className="col-6">
                      {order.products.map(product =>
                        <div className="container-fluid">
                          <div className="row justify-content-center align-items-center text-center p-0">
                            <hr className="w-100" />
                            <div className="col-1 p-1 border rounded-circle bg-warning">
                              <b>x{product.qty}</b>
                            </div>
                            <div className="col">
                              <p className="p-0 m-0"><b>{product.name}</b></p>
                            </div>
                            <div className="col">
                              <p className="p-0 m-0">${product.price}</p>
                            </div>
                            <div className="col h5">
                              ${(product.price * product.qty).toFixed(2)}
                            </div>
                          </div>
                        </div>)}
                    </div>
                    <div className="col">
                      <div className="container-fluid card shadow-sm mt-3">
                        <div className="row card-body justify-content-center align-items-center">
                          <h5 className="text-center">Shipping Details</h5>
                          <hr className="w-100" />
                          <div className="container">
                            <div className="row p-1">
                              <div className="col-6 p-1 ">
                                <p className="p-0 m-0">Name: {order.charge.billing_details.name}</p>
                              </div>
                              <div className="col-6 p-1 ">
                                <p className="p-0 m-0">Country: {order.charge.billing_details.address.country}</p>
                              </div>
                              <hr className="w-100" />
                              <div className="col-6 p-1 ">
                                <p className="p-0 m-0">City: {order.charge.billing_details.address.city}</p>
                              </div>
                              <div className="col-6 p-1 ">
                                <p className="p-0 m-0">Address Line: {order.charge.billing_details.address.line1}</p>
                              </div>
                              <hr className="w-100" />
                              <div className="col-6 p-1 ">
                                <p className="p-0 m-0">Postal Code: {order.charge.billing_details.address.postal_code}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center text-muted text-center mb-2 p-2">
                    <hr className="w-100" />
                    <div className="col-4 h5">
                      Items: <b>{order.totalCart.totalQty}</b>
                    </div>
                    <div className="col-6">
                      <h5>Total Price:<b> ${order.totalCart.totalPrice}</b></h5>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          :
          loading ?
            <div>
              <h2 className="text-center text-muted">Loading...</h2>
            </div>
            :
            <div className="container mt-5 mb-5">
              <br />
              <h1 className="display-3 text-center text-muted">No Recent Orders Yet...</h1>
              <br />
              <br />
            </div>
      }
    </div>
  )
}

export default RecentOrders
