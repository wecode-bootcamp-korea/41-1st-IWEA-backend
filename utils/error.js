const asyncErrorHandler = (func) => {
  return async (req, res, next) => {
    await func(req, res).catch((error) => next(error));
  };
};

const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = {
  errorHandler,
  asyncErrorHandler,
};
