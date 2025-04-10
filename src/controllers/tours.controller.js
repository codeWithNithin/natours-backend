const { TourModel } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(TourModel.find(), req.query).sort().limitFields().paginate();

  const tours = await features.query

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

exports.getTour = catchAsync(async (req, res) => {
  const tour = await TourModel.findById(req.params.id);

  if (!tour) return next(new AppError('No tour found with that ID', 404))

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await TourModel.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  })
})

exports.updateTour = catchAsync(async (req, res) => {
  const options = { new: true, runValidators: true }
  const updatedTour = await TourModel.findByIdAndUpdate(req.params.id, req.body, options);

  if (!updatedTour) return next(new AppError('No tour found with that ID', 404))

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour
    }
  })
})

exports.deleteTour = catchAsync(async (req, res) => {
  const deletedTour = await TourModel.findByIdAndDelete(req.body.id)

  if (!deletedTour) return next(new AppError('No tour found with that ID', 404))

  res.status(204).json({
    status: 'success',
    data: null
  });
})