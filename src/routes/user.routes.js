const express = require('express');
const { userController, authController } = require('../controllers');

const userRoutes = express.Router()


userRoutes.post('/signup', authController.signup)
userRoutes.post('/login', authController.login)

userRoutes
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRoutes
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRoutes