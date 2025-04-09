const catchAsync = requestHandler => {
  return (req, res, next) => {
    requestHandler(req, res, next).catch((err) => next(err))
  }
}

module.exports = catchAsync