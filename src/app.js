const express = require('express');

const app = express();

const tourRoutes = require('./routes/tour.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes)

module.exports = app;