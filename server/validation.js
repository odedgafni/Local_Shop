const Joi = require('@hapi/joi');

const userRegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(20).email().required(),
    password: Joi.string().min(6).max(20).required()
  })
  return schema.validate(data);
}

const userLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(20).email().required(),
    password: Joi.string().min(6).max(20).required()
  })
  return schema.validate(data);
}

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().min(1).required(),
    imageUrl: Joi.string().min(9).required()
  })
  return schema.validate(data);
}

const emailValidation = (data) => {
  const email = Joi.object({
    email: Joi.string().min(5).max(20).email().required()
  })
  return email.validate(data);
}

module.exports = {
  productValidation,
  userRegisterValidation,
  userLoginValidation,
  emailValidation
}