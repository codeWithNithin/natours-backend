const { TourModel } = require("../models");

exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await TourModel.find({});
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await TourModel.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: `Invalid tour id`
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await TourModel.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.updateTour = async (req, res) => {
  try {

    const options = { new: true, runValidators: true }

    const updatedTour = await TourModel.findByIdAndUpdate(req.params.id, req.body, options);

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await TourModel.findByIdAndDelete(req.body.id)
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}