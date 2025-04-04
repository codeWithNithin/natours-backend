const { UserModel } = require("../models")

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}).select('-password');
    res.status(200).json({
      status: 'success',
      count: users.length,
      data: users
    })

  } catch (err) {

  }
}


exports.getUser = (req, res, next) => {
  res.status(501).json({
    status: false,
    message: 'NOT IMPLEMENTED!!!'
  })
}

exports.createUser = (req, res, next) => {
  res.status(501).json({
    status: false,
    message: 'NOT IMPLEMENTED!!!'
  })
}

exports.updateUser = (req, res, next) => {
  res.status(501).json({
    status: false,
    message: 'NOT IMPLEMENTED!!!'
  })
}

exports.deleteUser = (req, res, next) => {
  res.status(501).json({
    status: false,
    message: 'NOT IMPLEMENTED!!!'
  })
}




