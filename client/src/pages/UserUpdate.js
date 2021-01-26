import React from 'react'
import useForm from '../customHooks/useForm'
import { history } from '../helpers/history'

import { useDispatch, useSelector } from 'react-redux'
import { updateRequest } from '../redux/actions/userActions'
import Constants from '../Constants/globalConstants'

const UserUpdate = () => {

  const handleSubmit = () => {
    if (values.email === "") {
      delete values.email
    }
    dispatch(updateRequest(values))
  }

  const [values, isValid, handleChange, submit, validate] = useForm(handleSubmit)

  const userState = useSelector(state => state.userAuth)
  const { update, loading, error } = userState;

  const dispatch = useDispatch()

  return (
    <div className="container">
      <br />
      <br />
      <div className="row mt-5">
        <div className="col col-md-8 col-lg-6">
          <div className="card shadow container">
            <div className="card-body">
              <div className="card-title">
                <h1 className="display-4 text-muted mb-4">Update Info</h1>
                {loading && <p className="text-muted">Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {update === Constants.Success &&
                  <p className="text-success">Success...</p>}
              </div>
              <div className="form-group">
                <label htmlFor="name">New Name</label>
                <input className={`form-control col-7 col-xl-5 ${isValid.name}`} type="text"
                  name="name"
                  value={values.name || ""}
                  onChange={handleChange}
                  onBlur={(e) => validate(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">New E-mail</label>
                <input className={`form-control col-8 col-xl-6 ${isValid.email}`} type="email"
                  name="email"
                  value={values.email || ""}
                  onChange={handleChange}
                  onBlur={(e) => validate(e)} />
              </div>
              {!loading && !update &&
                <button className="btn btn-primary px-3 mt-2 mb-3" onClick={submit}>Save</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserUpdate
