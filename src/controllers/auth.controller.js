const { UserModel } = require("../models")
const jwt = require('jsonwebtoken')


exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body
    const newUser = await UserModel.create({ name, email, password, passwordConfirm });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    })

  } catch (err) {
    console.log('err', err)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password'
    })
  }

  try {

    const user = await UserModel.findOne({ email });

    const passwordMatched = await user.isPasswordCorrect(password)

    if (!user || !passwordMatched) {
      return res.status(400).json({
        status: 'fail',
        message: 'Uset not found'
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    res.status(200).json({
      status: 'success',
      token
    })

  } catch (err) {
    console.log('err', err)
  }
}

exports.protect = async (req, res, next) => {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'user is not authorized !!!'
      })
    }

    // verify the token and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 'failed',
        message: 'user is not authorized !!!'
      })
    }

    const freshUser = await UserModel.findById(decoded.id);
    req.user = freshUser;
    next()
  } catch (err) {

  }
}