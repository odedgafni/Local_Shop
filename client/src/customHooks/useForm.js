import { useState } from 'react'
import { emailValidation, passwordValidation } from '../helpers/validation'
import Constants from '../Constants/globalConstants'

const useForm = (handleSubmit) => {

  const [values, setValues] = useState({})

  const [isValid, setIsValid] = useState({})

  const submit = (e) => {
    e.preventDefault();
    handleSubmit();
    setIsValid({});
  }

  const validate = (e) => {
    e.persist();
    if (e.target.type === "email") {
      emailValidation(e.target.value) ?
        setIsValid({ [e.target.name]: Constants.valid })
        : setIsValid({ [e.target.name]: Constants.invalid })
    } else if (e.target.type === "password") {
      passwordValidation(e.target.value) ?
        setIsValid({ [e.target.name]: Constants.valid })
        : setIsValid({ [e.target.name]: Constants.invalid })
    } else
      e.target.value ?
        setIsValid({ [e.target.name]: Constants.valid })
        : setIsValid({ [e.target.name]: Constants.invalid })
  }

  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    validate(e);

  }
  return [values, isValid, handleChange, submit, validate]
}

export default useForm
