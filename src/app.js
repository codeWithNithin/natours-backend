const express = require('express');

const app = express();

const tourRoutes = require('./routes/tour.routes');
const userRoutes = require('./routes/user.routes');

const { globalErrorController } = require('./controllers');
const AppError = require('./utils/appError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;