const express = require('express');

const app = express();

const tourRoutes = require('./routes/tour.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tours', tourRoutes);

module.exports = app;