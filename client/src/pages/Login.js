import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import useForm from '../customHooks/useForm';

import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/userActions";

const Login = () => {

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.userAuth);
  const [showError, setShowError ] = useState(true)

  const handleSubmit = async () => {
    setShowError(true)
    const userReq = values;
    dispatch(loginRequest(userReq));
  }

  const [values, isValid, handleChange, submit, validate] = useForm(handleSubmit)

  useEffect(() => {
    setShowError(false)
  }, [values])

  return (
    <Container className="mt-5">
      <br />
      <br />
      <br />
      <Card className="m-auto align-items-center col-sm-6">
        <CardBody className="w-100 px-5">
          <Form>
            <h2 className="text-primary display-3 text-center mb-4">Login</h2>
            {error && showError && <p className="text-danger">{error}</p>}
            <FormGroup>
              <Label className="required" htmlFor="email">Email</Label>
              <Input className={isValid.email} type="email"
                name="email"
                value={values.email || ""}
                onChange={handleChange} 
                onBlur={(e) => validate(e)}/>
            </FormGroup>
            <FormGroup>
              <Label className="required" htmlFor="email">Password</Label>
              <Input className={isValid.password} type="password"
                name="password"
                value={values.password || ""}
                onChange={handleChange} 
                onBlur={(e) => validate(e)}/>
            </FormGroup>
            <FormGroup className="mb-3" check >
              <Label check>
                <Input type="checkbox" />
                Remember Me
              </Label>
            </FormGroup>
            <Button color="primary" onClick={submit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  )
}
export default Login
