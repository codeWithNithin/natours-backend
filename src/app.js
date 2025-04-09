const express = require('express');

const app = express();

const tourRoutes = require('./routes/tour.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes)

app.all('*', (req, res, next) => {

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message
  });
});

module.exports = app;