import React from 'react'
import { history } from '../helpers/history'
import { useSelector } from 'react-redux'

const UserInfo = () => {

  const userAuth = useSelector(state => state.userAuth)
  const { user } = userAuth;

  return (
    <div className="container">
      <br />
      <h1 className="display-4 mt-5 mb-4">{user && user.name}'s Account</h1>
      <div className="list-group row">
        <div className="col col-lg-6">
          <div className="shadow list-group-item"><b>Full Name:</b> {user && user.name}</div>
          <div className="list-group-item"><b>Email:</b> {user && user.email}</div>
          <div className="list-group-item"><b>Created On:</b> {user && user.date.substring(0, 10)}</div>
          <div className="list-group-item"><b>Recent Orders: </b><a href="/user/recent_orders">My Orders</a> </div>
          <div className="shadow list-group-item"><b>Admin:</b> {user && user.isAdmin ? " Yes" : " No"}</div>
          <button className="mt-5 btn btn-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this account?')) {
                // Delete Hanlder //
              }
            }}>
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
