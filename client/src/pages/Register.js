import Constants from '../Constants/globalConstants'
import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import useForm from '../customHooks/useForm';
import { registerRequest } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {

  const dispatch = useDispatch();
  const registerMessage = useSelector(state => state.userRegister.message)
  const messageType = useSelector(state => state.userRegister.display)

  const handleSubmit = async () => {
    if (values.password !== values.confirmedPassword) {
      return setMessage(Constants.Passwords_Do_Not_Match);
    }
    delete values.confirmedPassword;
    const newUser = values;
    console.log(newUser);
    dispatch(registerRequest(newUser));
  }

  const [values, isValid, handleChange, submit, validate] = useForm(handleSubmit)

  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(registerMessage)
  }, [dispatch, registerMessage,])

  return (
    <Container className="mb-3 mt-5">
      <br />
      <br />
      <br />
      {message === Constants.Success ?
        <div className="text-center">
          <h1 className="text-success display-3">Success...</h1>
        </div>
        :
        <Card className="m-auto align-items-center col-sm-8">
          <CardBody className="w-100 px-4">
            <Form className="align-items-center">
              <h2 className="text-primary display-3 text-center mb-4">Register</h2>
              {message &&
                <p className={messageType ? `text-${messageType}` : "text-danger "}>{message}</p>}
              <Row>
                <FormGroup className="col-sm-6">
                  <Label className="required" htmlFor="name">Full Name</Label>
                  <Input className={isValid.name} type="text"
                    name="name"
                    value={values.name || ""}
                    onChange={handleChange}
                    onBlur={(e) => validate(e)} />
                </FormGroup>
                <FormGroup className="col-sm-6">
                  <Label className="required" htmlFor="email">Email</Label>
                  <Input className={isValid.email} type="email"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                    onBlur={(e) => validate(e)} />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup className="col-sm-6">
                  <Label className="required" htmlFor="password">Password</Label>
                  <Input className={isValid.password} type="password"
                    name="password"
                    value={values.password || ""}
                    onChange={handleChange}
                    onBlur={(e) => validate(e)} />
                </FormGroup>
                <FormGroup className="col sm-6">
                  <Label className="required" htmlFor="confirmedPassword">Confirm Password</Label>
                  <Input className={isValid.confirmedPassword} type="password"
                    name="confirmedPassword"
                    value={values.confirmedPassword || ""}
                    onChange={handleChange}
                    onBlur={(e) => validate(e)} />
                </FormGroup>
              </Row>
              <FormGroup className="mb-3" check >
                <Label check>
                  <Input type="checkbox" />
                I agree to all sort of stuff
              </Label>
              </FormGroup>
              <Button onClick={submit} color="primary">Submit</Button>
            </Form>
          </CardBody>
        </Card>}
    </Container>
  )
}
