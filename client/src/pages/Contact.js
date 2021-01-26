import React, { useState, useEffect } from 'react'
import ModalPopup from '../components/Modal';
import useForm from '../customHooks/useForm'

const Contact = () => {

  const [values, isValid, handleChange, , validate] = useForm()

  const [error, setError] = useState("")

  useEffect(() => {
    setError("")
  }, [values])

  return (
    <div className="container roboto ">
      <br />
      <div className="row justify-content-center">
        <div className="col-sm-10 col-lg-8 card shadow mt-5 p-0">
          <div className="card-body">
            <div className="jumbotron py-2 bg-dark text-light border">
              <h1 className="display-4 text-center mt-3 mb-3">Contact</h1>
            </div>
            <div className="form-group">
              <label className="required" htmlFor="name">Full Name</label>
              <input className={`form-control col-6 col-md-4 ${isValid.name}`} type="text"
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                onBlur={(e) => validate(e)} />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="email">E-mail</label>
              <input className={`form-control col-6 col-md-4 ${isValid.email}`} type="email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                onBlur={(e) => validate(e)} />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="subject">Subject</label>
              <input className={`form-control col-8 col-md-6 ${isValid.subject}`} type="text"
                name="subject"
                value={values.subject || ""}
                onChange={handleChange}
                onBlur={(e) => validate(e)} />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="textArea">Message</label>
              <textarea className="form-control" rows="5"
                name="message"
                value={values.message || ""}
                onChange={handleChange}
                onBlur={(e) => validate(e)}>
              </textarea>
            </div>
            {error &&
              <p className="text-danger">{error}</p>}
            <ModalPopup
              buttonLabel="Send"
              data={values}
              setError={setError}
              title="Thank You!"
              message="Our crew will get back to you shortly." />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
