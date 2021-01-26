const User = require('../models/User');
const { userRegisterValidation, userLoginValidation, emailValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Constants = require('../Constants');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ message: Constants.success, user });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

const userRegister = async (req, res) => {
  const { error } = userRegisterValidation(req.body);
  if (error) return res.json({ message: error.details[0].message })

  const emailExist = await User.findOne({ email: req.body.email.toLowerCase() });
  if (emailExist) return res.json({ message: Constants.emailExists });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashedPassword
  })
  try {
    newUser.save();
    res.json({ message: Constants.success, user: newUser });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: Constants.serverError })
  }
}

const userLogin = async (req, res) => {
  const { error } = userLoginValidation(req.body);
  if (error) return res.json({ message: error.details[0].message })

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.json({ message: Constants.invalidDetails });

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) return res.json({ message: Constants.invalidDetails });
  try {
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    res.json({ message: Constants.success, token, user })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError })
  }
}

const userUpdate = async (req, res) => {
  try {
    if (req.body.email) {
      const emailExist = await User.findOne({ email: req.body.email.toLowerCase() });
      if (emailExist) return res.json({ message: Constants.emailExists });

      const { error } = emailValidation({email: req.body.email});
      if (error) return res.json({ message: error.details[0].message })
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    res.json({ message: Constants.success, user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: Constants.serverError })
  }
}

module.exports = {
  userRegister,
  userLogin,
  getUserById,
  userUpdate
}