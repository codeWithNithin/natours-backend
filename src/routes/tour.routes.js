const express = require('express');
const { tourController } = require('../controllers');

const tourRoutes = express.Router();

tourRoutes
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRoutes
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRoutes;